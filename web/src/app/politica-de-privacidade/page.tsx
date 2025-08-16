import Head from "next/head";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Head>
        <title>Política de Privacidade - Galeria de Imagens</title>
        <meta name="description" content="Saiba como tratamos seus dados." />
      </Head>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Política de Privacidade</h1>
        <p>Detalhes sobre nossa política de privacidade.</p>
      </div>
    </>
  );
}
