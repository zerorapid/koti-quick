{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.jdk17
    pkgs.android-tools
  ];
  env = {
    JAVA_HOME = "${pkgs.jdk17}/lib/openjdk";
  };
  idx = {
    extensions = [
      "msjsdiag.vscode-react-native"
    ];
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {
        # Optional: start metro bundler
        # metro = "npx expo start --android";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm", "run", "web", "--", "--port", "$PORT", "--host", "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
