interface SignatureCardProps {
  name: string;
  message: string;
  createdAt: string;
  formattedDate: string;
}

export function SignatureCard({
  name,
  message,
  createdAt,
  formattedDate
}: SignatureCardProps) {
  return (
    <article className="signature-card">
      <blockquote className="signature-card__message">{message}</blockquote>
      <footer className="signature-card__footer">
        <p className="signature-card__name">{name}</p>
        <time className="signature-card__date" dateTime={createdAt}>
          {formattedDate}
        </time>
      </footer>
    </article>
  );
}
