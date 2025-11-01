import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Publicação | Galeria de Arte Humana",
  description:
    "Conheça as regras de curadoria da nossa galeria e entenda por que somente obras humanas são aceitas.",
};

export default function PoliticaDePublicacaoPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Política de Publicação</h1>
        <p className="text-muted-foreground">
          Construímos esta galeria para celebrar a expressão humana. A curadoria existe para proteger esse propósito e garantir transparência para quem cria e para quem admira arte.
        </p>
      </header>

      <article className="space-y-4">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Somente obras humanas</h2>
          <p>
            Não publicamos imagens geradas por inteligência artificial ou criadas com auxílio massivo de ferramentas automatizadas. Valorizamos o gesto, o traço e a visão particulares de cada pessoa artista.
          </p>
          <p>
            Conte-nos como a obra nasceu: processos analógicos, sketchbooks, bastidores ou qualquer evidência manual fortalecem nossa curadoria colaborativa.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Como funciona a curadoria</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Todo envio chega com status de <strong>pendente</strong> e passa por análise humana.</li>
            <li>Checamos a assinatura digital ou certificado de autoria enviado junto com a obra.</li>
            <li>Revisamos contexto, descrição, tags e eventuais links de referência.</li>
            <li>Se houver dúvidas, entramos em contato solicitando materiais complementares.</li>
            <li>Depois da aprovação, a obra passa a aparecer na galeria pública.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Critérios para reprovação</h2>
          <p>
            Um envio pode ser recusado quando identificamos indícios de geração por IA, uso de assets sem autorização ou ausência de informações que comprovem autoria. Sempre que possível, retornamos com orientações para um novo envio.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Transparência e respeito</h2>
          <p>
            Prezamos por uma comunicação acolhedora. Cada decisão de curadoria é registrada com notas internas e pode ser consultada pela equipe administrativa. Se sua obra for recusada, você receberá o motivo detalhado e poderá tentar novamente.
          </p>
        </section>
      </article>

      <footer className="rounded-md border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
        Dúvidas? Escreva para nossa equipe pelo canal de contato. Estamos aqui para apoiar quem cria com as próprias mãos e coração.
      </footer>
    </section>
  );
}
