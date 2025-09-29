import MapplsGL from "mappls-map-react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export class MapplsAutoSuggestApiSettings {
    tokenizeAddress: boolean = false;
    enableBridge: boolean = false;
    customLocation: string = '28.550629,77.268859';
    pod?: any;
    filter?: string;
    hyperLocal: boolean = false;
    responseLang?: string;
    enableExplain: boolean = false;
    enableMapcenter: boolean = false;
    isPrimary?: string;
    zoom?: number;

    static instance = new MapplsAutoSuggestApiSettings();
}