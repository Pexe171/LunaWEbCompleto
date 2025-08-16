import Head from "next/head";

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre - Galeria de Imagens</title>
        <meta name="description" content="Conheça mais sobre o projeto." />
      </Head>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Sobre</h1>
        <p>Informações sobre o site.</p>
      </div>
    </>
  );
}
