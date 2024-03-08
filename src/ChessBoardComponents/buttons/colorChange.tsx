const colorTemplates = [
  { name: "Default", white: "#ebecd0", black: "#779556" },
  { name: "Light", white: "#f0f0f0", black: "#d3d3d3" },
  { name: "Dark", white: "#ffffff", black: "#000000" },
  // Add more color templates as needed
];

export default function handleColorChange(sample: string) {
  const selectedTemplate = colorTemplates.find(
    (template) => template.name === sample
  );

  if (selectedTemplate) {
    const whiteTiles = document.querySelectorAll(
      ".white-tile"
    ) as NodeListOf<HTMLElement>;
    const blackTiles = document.querySelectorAll(
      ".black-tile"
    ) as NodeListOf<HTMLElement>;

    whiteTiles.forEach(
      (tile) => (tile.style.backgroundColor = selectedTemplate.white)
    );
    blackTiles.forEach(
      (tile) => (tile.style.backgroundColor = selectedTemplate.black)
    );
  } else {
    alert("Invalid template name. Using default colors.");
  }
};