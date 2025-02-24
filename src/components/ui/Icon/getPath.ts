export default function getPath(svgString: string): string {
  const pathMatch = svgString.match(/d="([^"]+)"/);
  return pathMatch ? pathMatch[1] : '';
}
