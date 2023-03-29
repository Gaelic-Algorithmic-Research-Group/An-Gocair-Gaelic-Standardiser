import Head from "next/head";
import Paraphraser from "@/components/paraphraser";

export default function Home() {
  return (
    <>
      {/* The head contains metadata in HTML - used on search engine result pages */}
      <Head>
        <title>An Gocair: Gaelic Standardiser</title>
        <meta
          name="description"
          content="The Gaelic Text Normaliser normalises the preGOC to GOC Gaelicthe using a Transformer based model. Use the normalising tool to help normalise the story."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
        {/* controls viewport's size and shape */}
      </Head>
      <Paraphraser />
    </>
  );
}
