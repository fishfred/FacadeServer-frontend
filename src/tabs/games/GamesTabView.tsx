/* tslint:disable:max-line-length */ // TODO: remove when styles are fixed

import RX = require("reactxp");
import Styles = require("../../Styles");
import {EngineStateMetadata, EngineStateMetadataRenderer} from "../../io/EngineStateMetadata";
import {TabView} from "../TabView";
import {GamesTabController} from "./GamesTabController";
import {GameInfo, GamesTabState, NameVersion, Version} from "./GamesTabState";

export class GamesTabView extends TabView<GamesTabState> {

  public render() {
    const controller: GamesTabController = this.props.model.getController() as GamesTabController;
    return (
      <RX.View>
        <RX.Text>Server status: {EngineStateMetadataRenderer.render(this.state.engineState)}</RX.Text>
        <RX.Text>Savegames on this server:</RX.Text>
        {this.state.games.map((game: GameInfo, i: number) => this.renderGameInfo(game, i, controller))}
      </RX.View>
    );
  }

  private renderGameInfo(game: GameInfo, gameIndex: number, controller: GamesTabController) {
    const engineState: EngineStateMetadata = this.state.engineState;
    const metaServerbase = "http://meta.terasology.org/modules/show/";
    const renderVersion = (v: Version) => v.major + "." + v.minor + "." + v.patch + (v.snapshot ? "-SNAPSHOT" : "");
    const renderModule = (module: NameVersion, modIndex: number) => {
      const modName = module.name.originalName;
      const modVer = renderVersion(module.version);
      const link = metaServerbase + modName + "/" + modVer;
      return <RX.Text key={modIndex}>{(modIndex !== 0 ? ", " : "")}<RX.Link url={link}>{modName + " " + modVer}</RX.Link></RX.Text>;
    };
    const stopButton = <RX.Button style={[Styles.box, Styles.greyBorder, Styles.cancelButton]} onPress={() => controller.stopGame()}>Stop</RX.Button>;
    const startButton = <RX.Button style={[Styles.box, Styles.greyBorder, Styles.okButton]} onPress={() => controller.startGame(game.manifest.title)}>Start</RX.Button>;
    const button = game.manifest.title === engineState.gameName ? stopButton : startButton;
    return (
      <RX.View key={gameIndex} style={[Styles.box, Styles.greyBorder]}>
        <RX.Text>{game.manifest.title} - {game.timestamp}</RX.Text>
        <RX.Text>Time: {game.manifest.time} - Seed: {game.manifest.seed}</RX.Text>
        <RX.Text>Modules: {game.manifest.modules.map(renderModule)}</RX.Text>
        {button}
      </RX.View>
    );
  }

}