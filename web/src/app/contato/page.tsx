import Head from "next/head";

export default function Contato() {
  return (
    <>
      <Head>
        <title>Contato - Galeria de Imagens</title>
        <meta name="description" content="Fale conosco." />
      </Head>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Contato</h1>
        <p>Entre em contato conosco.</p>
      </div>
    </>
  );
}
