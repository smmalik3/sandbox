import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {

  function Header({ title }) {
    return <h1>{title ? title : "Salman's Dev Sandbox"}</h1>;
  }

  const {Configuration,OpenAIApi} = require("openai");

  const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function runCompletion() {
      const userPrompt = "Can you create a job description for a Software Engineer working at Deloitte Digital with 3 years experience?"
      // console.log('USER PROMPT LENGTH ---> ' + userPrompt.length)
      console.log("Waiting for ChatGPT to respond...")
      console.log("---------------------------------")
      const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          temperature: 0.5,
          max_tokens: 2048,
          frequency_penalty: 0.5,
          presence_penalty: 0,
          prompt: userPrompt,
      });
      // console.log(completion.data.choices[0].text);
      // console.log(completion.data)
      let response = completion.data.choices[0].text
      chatGPTResponse(response)
      return response
  }

  // runCompletion();

  function chatGPTResponse(response) {
      console.log('This is the response from ChatGPT: ' + response)
      const gptResponse = response
      return gptResponse
  }
    
    return (
      <div className=''>
        
        <Head>
          <title>Salman's Dev Sandbox</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Header />

          <div class="card text-center">
            <div class="card-header">
              ChatGPT Integration Example
            </div>
            <div class="card-body">
              <h5 class="card-title">Job Description Generator</h5>
              <p class="card-text">Enter a prompt below to generate a job description</p>
              <form>
                <div class="row mb-3">
                  <label for="userPrompt" class="col-sm-12 col-form-label">Prompt:</label>
                  <div class="col-sm-12">
                    <textarea class="form-control" id="userPrompt"></textarea>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" onClick={() => runCompletion()}>Generate</button>
              </form>
            </div>
            <div class="card-footer text-body-secondary">
              <p>
                {chatGPTResponse()}
              </p>
            </div>
          </div>
        </main>

        <footer>
          Footer
        </footer>

        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
}
