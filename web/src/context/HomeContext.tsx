import { createContext, ReactNode, useEffect, useState } from "react";

interface HomeContextData {
    isPlaying: boolean;
    isMute: boolean;
    volume: number;
    tempoCorrente: number;
    tempoTotal: number;
    audioIndex: number;
    configAudio: ()=>void;
    alternarPausaDeReprodução: ()=>void;
    toongleMute: ()=> void;
    configVolume: (value: number) => void;
    configTempoCorrente: (value: number) => void;
    atualizarAudio: (value: number) => void;
    setupgAudioIndex: (index: number) => void;
}
interface HomeContextProviderProps {
    children: ReactNode;
}
export const HomeContext = createContext({} as HomeContextData);

const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const [tempoCorrente, setTempoCorrente] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);
    const [audioIndex, setAudioIndex] = useState(0); 

    const configAudio = () => {
        atualizarAudio(0);
    }
    const setupgAudioIndex= (index : number) => { 
        pause();
        setIsPlaying(false);
        setTempoCorrente(0);
        atualizarAudio(index);
    }
    const atualizarAudio = (index: number) => {
        const audioCorrenteIndex = index % 10;
        const audioInicial = new Audio(`/audios/audio${audioCorrenteIndex + 1}.mp3`);
        setAudioIndex(index); 
        setTempoCorrente(0);
        setAudio(audioInicial);

        audioInicial.onloadeddata = ()=> {
            setTempoTotal(audioInicial.duration);
        }
        audioInicial.ontimeupdate = ()=> {
            setTempoCorrente(audioInicial.currentTime);
        }
    }
    // toonglePlayPause
   const alternarPausaDeReprodução = ()=> {
            if(isPlaying) { // se o audio estiver rodando, posso pausar
                pause();
                setIsPlaying(false);
            } else { // se não, posso colocar play
                play();
                setIsPlaying(true);
            }
   }
    const play = ()=> {
        audio.play();
    }
    const pause = ()=> {
        audio.pause();
    }
    const toongleMute = () => {
        const mutar = !audio.muted;
        setIsMute(mutar);
        audio.muted = mutar;
    }
    const configVolume = (value: number) => {
        setVolume(value);
        audio.volume = value; 
    }
    const configTempoCorrente = (value: number) => {
        setTempoCorrente(value);
        audio.currentTime = value;
    }
    return (
        <HomeContext.Provider value={{
            isPlaying,
            isMute,
            volume,
            tempoCorrente,
            tempoTotal,
            audioIndex,
            configAudio,
            alternarPausaDeReprodução,
            toongleMute,
            configVolume,
            configTempoCorrente,
            atualizarAudio,
            setupgAudioIndex,
        }}>
        {children}
        </HomeContext.Provider>
    );
}

export default HomeContextProvider;