// This page just tests that the gql encryption middleware is working e2e

export function PingPong({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Happy coding!</p>
    </div>
  );
}

export default PingPong;
