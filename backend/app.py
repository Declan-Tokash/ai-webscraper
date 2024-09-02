from flask import Flask, request, jsonify
from scrape import scrape_website, extract_body_content, clean_body_content, split_dom_content
from parse import parse_with_ollama
import redis
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        result = scrape_website(url)
        body_content = extract_body_content(result)
        cleared_content = clean_body_content(body_content)
        redis_client.set('cleared_content', cleared_content)

        return jsonify({'content': 'Data loaded Successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
@app.route('/analyze', methods=['GET'])
def analyze():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        cleared_content = redis_client.get('cleared_content')
        if cleared_content is None:
            return jsonify({'error': 'No content available'}), 404

        cleared_content = cleared_content.decode('utf-8')
        dom_chunks = split_dom_content(cleared_content)
        print(dom_chunks)
        parsed_result = parse_with_ollama(dom_chunks, query)
        return jsonify({'content': parsed_result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)