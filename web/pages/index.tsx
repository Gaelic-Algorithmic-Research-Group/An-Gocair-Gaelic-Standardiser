import Head from 'next/head';
import Layout from '@/components/Layout'
import Paraphraser from '@/components/paraphraser'

export default function Home() {
  return (
    <div>
      <Head>
        <title>An Gocair: Gaelic Standardiser</title>
        <meta name="description" content="Gaelic Text Normaliser normalises the preGOC to GOC Gaelicthe using Transformer based model. Use the normalising tool, to help normalise the story." />
        <link rel="icon" href="http://xiha.hate.codes/sslab/favicon.png" />
      </Head>
      <Layout>
        <Paraphraser />
      </Layout>
    </div>
  );
}
