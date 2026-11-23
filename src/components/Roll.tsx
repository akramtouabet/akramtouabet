/** Texte qui roule au survol : le parent doit porter la classe `roll`. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="rl">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
