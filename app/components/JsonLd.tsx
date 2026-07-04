// Renders a JSON-LD structured-data script. Content is trusted (built from our
// own data), so serialising it into the tag is safe.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
