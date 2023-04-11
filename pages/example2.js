import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {

  function Header({ title }) {
    return <h1>{title ? title : "Salman's Dev Sandbox"}</h1>;
  }
  const {Configuration,OpenAIApi} = require("openai");
  const configuration = new Configuration({
      apiKey: "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",
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

          <div className="card text-center">
            <div className="card-header">
              ChatGPT Integration Example
            </div>
            <div className="card-body">
              <h5 className="card-title">Job Description Generator</h5>
              <p className="card-text">Enter a prompt below to generate a job description</p>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Create a job description for a </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose...</option>
                            <option value="1">Software Engineer</option>
                            <option value="2">Product Manager</option>
                            <option value="3">UX Designer</option>
                        </select>
                        </div>
                        
                        <div className="col-auto my-1">
                        <label className="mr-sm-2" for="inlineFormCustomSelect">working at </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose...</option>
                            <option value="1">Deloitte Digital</option>
                            <option value="2">Federal Government</option>
                            <option value="3">a Startup</option>
                        </select>
                        </div> 
                        
                        <div className="col-auto my-1">
                        <label className="mr-sm-2" for="inlineFormCustomSelect">with </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose...</option>
                            <option value="1">3 years experience</option>
                            <option value="2">5 years experience</option>
                            <option value="3">10+ years experience</option>
                        </select>
                        </div>
                        <div className="col-auto my-1">
                        <div className="custom-control custom-checkbox mr-sm-2">
                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing"></input>
                            <label className="custom-control-label" for="customControlAutosizing">Remember my preference</label>
                        </div>
                        </div>
                        <div className="col-auto my-1">
                        <button type="submit" className="btn btn-primary" onClick={() => runCompletion()}>Generate</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer text-body-secondary">
              <p>
                {chatGPTResponse()}
              </p>
            </div>
          </div>
        </main>

        <footer>
        Copyright {new Date().getFullYear()} © <a href="https://www.salmanmalik.co" target="_blank">Salman Malik</a>.
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
