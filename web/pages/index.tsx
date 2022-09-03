import Head from 'next/head';
import Layout from '@/components/Layout'
import Paraphraser from '@/components/paraphraser'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Paraphrasing Tool &amp; Article Rewriter to paraphrase sentences.</title>
        <meta name="description" content="Paraphrasing tool accurately rewrites the essays and articles using advanced AI. Use the completely free article rewriter tool, to help avoid plagiarism and increase creativity by rewording phrases. No signup required." />
        <link rel="icon" href="/paraphrasing-tool/favicon.png" />
      </Head>
      <Layout>
        <Paraphraser />
      </Layout>
    </div>
  );
}
