{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  env = {};
  idx = {
    extensions = [
      "astro-build.astro-vscode"
      "bradlc.vscode-tailwindcss"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "4321" "--host" "0.0.0.0"];
          manager = "web";
          env = {
            PORT = "4321";
          };
        };
      };
    };
  };
}
