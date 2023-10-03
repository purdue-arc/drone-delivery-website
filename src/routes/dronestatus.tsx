import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <main>
      <Title>Drone Status</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <p>
        {/* body */}

        Hi, this is Ryan. 

        
      </p>
    </main>
  );
}