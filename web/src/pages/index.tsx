import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import styles from '../../styles/Home.module.css';
import {Icon} from '@material-ui/core';
import {sequenciadetempo} from '../utils/converter';
import {musics} from '../data/musics';
import {musics2} from '../data/musics2';

export default function Home() {
  const {
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
      setupgAudioIndex
    } = useContext(HomeContext);

  useEffect(()=> {
     configAudio();
  }, []);

  return (
    <>
    <Head>
    <title>Aplicação de Áudio</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className={styles.container}>
    
      <div className={styles.conteudo}>
        <div className={styles.principal}>
          <div className={styles.barraLateral}>
               <img className={styles.img_Barra_Lateral}  src="/teste.jpeg" width={35} height={18} />  
               <div className={styles.conteudo}> 
                <div className={styles.titulo_conteudo}>LIBRARY</div>
                <div>
                  <div className={styles.titulo_opcao}> <Icon className={styles.icones}>queue_music</Icon>Playlists </div>
                  <div className={styles.titulo_opcao}>  <Icon className={styles.icones}>person</Icon>Artists</div>
                  <div className={styles.titulo_opcao}>  <Icon className={styles.icones}>library_music</Icon>Albuns</div>
                  <div className={styles.titulo_opcao}>  <Icon className={styles.icones}>music_note</Icon>Songs</div>
                </div>
                <div className={styles.titulo_conteudo}>DISCOVER</div>
                <div>
                  <div className={styles.titulo_opcao}> <Icon className={styles.icones}>queue_music</Icon>Store </div>
                  <div className={styles.titulo_opcao}>  <Icon className={styles.icones}>person</Icon>Radio</div>
                  <div className={styles.titulo_opcao2}>  <Icon className={styles.icones2}>favorite</Icon>For You</div>
                </div>
              </div>
           </div>
           <div className={styles.main_conteudo}>
                <div className={styles.conteudo_menu}>
                  <div className={styles.conteudo_menu_img}>   
                      <Icon className={styles.playicon}>play_circle_filled</Icon>
                      <Icon className={styles.playicon2}>ios_share</Icon>
                      <Icon className={styles.playicon3}>add</Icon>
                      <h6> Classic Rock  </h6>
                      <p>O melhor do rock dos anos 70,80,90</p>     
                      <form>
                      <input className={styles.buscar}
                        type="text"
                        placeholder="Buscar"
                      />
                      </form> 
                  </div>
              </div>
                <div className={styles.main_conteudo_musicas}>
                  <div className={styles.conteudo_musica}>
                    <h3 className={styles.conteudo_titulo}>Músicas Preferidas</h3>
                    <div className={styles.conteudo_detalhes_musicas}>
                        {
                          musics.map((music, index) => {
                            return (
                              <div key={music.title} className={styles.detalhe_musica} onClick={() =>  setupgAudioIndex(index)}> 
                                <img src={`capas/${music.cover}`}></img>
                                <h6>{music.title}</h6>
                              </div>
                            );
                          })
                        }
                    </div>
                  </div> 
                   <div className={styles.subsecoes}>
                     <div className={styles.popular}>Popular</div>
                     <div className={styles.conteudo_detalhes_musicas2}> 
                     {
                          musics2.map((music2) => {
                            return (
                              <div key={music2.title} className={styles.detalhe_musica2}> 
                                <img src={`capas/${music2.cover}`}></img>
                                <h6>{music2.title}</h6>
                                <Icon className={styles.icone_add}>add</Icon>
                              </div>
                            );
                          })
                        }
                      </div>
                   </div>
                </div>   
             </div>
          </div>
          <div className={styles.barra_controles}>
            <div className={styles.detalhes_audio}>
                <img src={`capas/${musics[audioIndex].cover}`} alt={musics[audioIndex].title}></img>
                <h5>{musics[audioIndex].artist}</h5>
            </div>

            <div className={styles.audio_controle}>
            <Icon className={styles.play}>skip_previous</Icon>
              {
                isPlaying ?
                 (<Icon className={styles.play} onClick={alternarPausaDeReprodução}>pause</Icon>):
                 (<Icon className={styles.play} onClick={alternarPausaDeReprodução}>play_arrow</Icon>)
              }
              <Icon className={styles.play}>skip_next</Icon>
              <div className={styles.audio_corrente}>
                {sequenciadetempo(tempoCorrente)}
                <input className={styles.time}
                  type="range" 
                  min="0" 
                  max={tempoTotal} 
                  step="0.01" 
                  value={tempoCorrente}
                  onChange={e => configTempoCorrente(Number(e.target.value))}
                  />
                {sequenciadetempo(tempoTotal)}
              </div>
            </div>
            <div className={styles.controle_volume}>
              {
                isMute ?
                (<Icon className={styles.mute} onClick={toongleMute}>volume_off</Icon>):
                (<Icon className={styles.mute} onClick={toongleMute}>volume_up</Icon>)
              }
              <input className={styles.volume}
                 type="range" 
                 min="0" 
                 max="1" 
                 step="0.01" 
                 value={volume}
                 onChange={e => configVolume(Number(e.target.value))}  
                 />   
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
