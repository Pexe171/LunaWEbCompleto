import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto da Arte Humana",
  description:
    "Entenda o propósito da nossa galeria e por que defendemos criações feitas por mãos humanas.",
};

export default function ManifestoDaArteHumanaPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Manifesto</p>
        <h1 className="text-5xl font-bold leading-tight">Manifesto da Arte Humana</h1>
        <p className="text-lg text-muted-foreground">
          Esta galeria nasce como um respiro: um lugar onde o tempo da criação importa mais do que o algoritmo, onde o erro vira textura e a intenção pulsa em cada traço.
        </p>
      </header>

      <article className="space-y-6 text-lg leading-relaxed">
        <p>
          Acreditamos que arte é encontro entre histórias. Quando uma pessoa desenha, pinta ou borda, ela registra memórias, dores e encantamentos que nenhuma máquina consegue reproduzir. Honramos esse gesto humano, frágil e poderoso.
        </p>
        <p>
          Por isso, escolhemos não exibir obras geradas por inteligência artificial. Respeitamos a tecnologia como ferramenta, mas queremos oferecer um palco dedicado a quem dedica horas, dias e anos aperfeiçoando o olhar e o ofício manual.
        </p>
        <p>
          A curadoria é viva e próxima. Conversamos com artistas, pedimos referências, entendemos processos. Cada obra aprovada carrega uma assinatura verificada e um relato sincero de criação.
        </p>
        <p>
          Este manifesto é um convite: compartilhe seu processo, sua voz e suas mãos. Sustentamos um espaço plural, acessível e seguro para que artistas independentes possam florescer.
        </p>
      </article>

      <section className="grid gap-6 rounded-lg border bg-muted/30 p-6 md:grid-cols-3">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">O que celebramos</h2>
          <p className="text-muted-foreground">
            Traços imperfeitos, narrativas pessoais, experimentos em papel, tela, tecido ou qualquer suporte escolhido por mãos humanas.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Como acolhemos</h2>
          <p className="text-muted-foreground">
            Curadoria manual, diálogo transparente e orientação quando algo precisa ser aprimorado antes da publicação.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">O que rejeitamos</h2>
          <p className="text-muted-foreground">
            Conteúdos que se apoiem em automação gerativa ou violem direitos autorais. A originalidade humana é nossa linha mestra.
          </p>
        </div>
      </section>

      <footer className="rounded-md border border-dashed p-6 text-center text-base text-muted-foreground">
        Se você compartilha deste propósito, envie sua obra, registre sua assinatura digital e venha construir conosco uma galeria onde a arte humana segue sendo referência.
      </footer>
    </section>
  );
}
