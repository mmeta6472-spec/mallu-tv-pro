import React, { useEffect, useMemo, useRef, useState } from 'react'
import Hls from 'hls.js'
import dashjs from 'dashjs'
import {
  Search, Home, Radio, Trophy, Film, Newspaper, Heart, Clock3, Settings,
  Plus, Play, Pause, Volume2, VolumeX, Maximize, ChevronRight, ChevronDown,
  Upload, Link2, Trash2, X, Tv, Globe2, Menu, MonitorPlay, ListVideo,
  CheckCircle2, AlertCircle, ExternalLink, Info
} from 'lucide-react'

const malayalamChannels = [
  { id:'ml-raj-news', name:'Raj News Malayalam', group:'Malayalam', country:'India', logo:'RN', url:'https://mumt04.tangotv.in/m18aqlK4RAJNEWSMALAYALAM/index.m3u8', color:'linear-gradient(135deg,#dc2626,#f97316)' },
  { id:'ml-raj-musix', name:'Raj Musix Malayalam', group:'Malayalam', country:'India', logo:'♪', url:'https://mumt04.tangotv.in/m18aqlK4RAJMUSIXMALAYALAM/index.m3u8', color:'linear-gradient(135deg,#7c3aed,#db2777)' },
  { id:'ml-kerala-vision', name:'Kerala Vision', group:'Malayalam', country:'India', logo:'KV', url:'https://cdn.pishow.tv/ott/live/243/master.m3u8', color:'linear-gradient(135deg,#15803d,#65a30d)' },
  { id:'ml-asianet', name:'Asianet', group:'Malayalam', country:'India', logo:'A', url:'https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starasianet.smil/chunklist_b1928000.m3u8', color:'linear-gradient(135deg,#dc2626,#7f1d1d)' },
  { id:'ml-surya-tv', name:'Surya TV', group:'Malayalam', country:'India', logo:'S', url:'https://d3dt6rg724ecr3.cloudfront.net/SuryaTv/SuryaTV-HDR10-IN-index.m3u8', color:'linear-gradient(135deg,#ea580c,#eab308)' },
  { id:'ml-asianet-middle-east', name:'Asianet Middle East', group:'Malayalam', country:'UAE', logo:'A+', url:'https://mumt03.tangotv.in/Dsly5z3HASIANETMIDDLEEAST/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f97316)' },
  { id:'ml-asianet-samsung', name:'Asianet (Samsung feed)', group:'Malayalam', country:'India', logo:'A', url:'https://asianet-samsung.vgcdn.net/ptnr-monitoring/vglive-sk-906908/playlist.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'ml-manorama-news', name:'Manorama News', group:'Malayalam', country:'India', logo:'MN', url:'https://cdn.pishow.tv/ott/live/463/master.m3u8', color:'linear-gradient(135deg,#1d4ed8,#38bdf8)' },
  { id:'ml-kairali', name:'Kairali TV', group:'Malayalam', country:'India', logo:'K', url:'https://streams.tangotv.in/KAIRALI/ORIGIN/index.m3u8', color:'linear-gradient(135deg,#be123c,#fb7185)' },
  { id:'ml-kairali-news', name:'Kairali News', group:'Malayalam', country:'India', logo:'KN', url:'https://cdn.pishow.tv/ott/live/1469/master.m3u8', color:'linear-gradient(135deg,#1d4ed8,#7c3aed)' },
  { id:'ml-amrita', name:'Amrita TV', group:'Malayalam', country:'India', logo:'A', url:'https://ddash74r36xqp.cloudfront.net/master.m3u8', color:'linear-gradient(135deg,#0f766e,#22c55e)' },
  { id:'ml-mazhavil', name:'Mazhavil Manorama', group:'Malayalam', country:'India', logo:'MM', url:'https://mmtv-vglivessai.akamaized.net/v1/master/673630b269b766886555eebfddd4f27f3de3ab50/f8a0827f-030f-4a0d-b7e5-338996c09a5b/index.m3u8', color:'linear-gradient(135deg,#db2777,#8b5cf6)' },
  { id:'ml-kappa', name:'Kappa TV', group:'Malayalam', country:'India', logo:'K', url:'https://cdn.pishow.tv/ott/live/1123/master.m3u8', color:'linear-gradient(135deg,#7c3aed,#2563eb)' },
  { id:'ml-flowers', name:'Flowers TV', group:'Malayalam', country:'India', logo:'F', url:'https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/flowers_nim_https/050522/flowers/playlist.m3u8', color:'linear-gradient(135deg,#db2777,#f97316)' },
  { id:'ml-big-tv', name:'Big TV Malayalam', group:'Malayalam', country:'India', logo:'BIG', url:'https://stream.ottlive.co.in/bigtvmalayalam/index.m3u8', color:'linear-gradient(135deg,#1d4ed8,#06b6d4)' },
  { id:'ml-channel-16', name:'Malayalam Live 16', group:'Malayalam', country:'India', logo:'16', url:'https://2-fss-2.streamhoster.com/pl_120/206508-3261972-1/playlist.m3u8', color:'linear-gradient(135deg,#334155,#64748b)' },
  { id:'ml-dd-malayalam', name:'DD Malayalam', group:'Malayalam', country:'India', logo:'DD', url:'https://fta.ektv.in/live/680/master.m3u8', color:'linear-gradient(135deg,#1d4ed8,#0f766e)' },
  { id:'ml-asianet-movies', name:'Asianet Movies', group:'Malayalam', country:'India', logo:'AM', url:'https://da86m1sqpm3o0.cloudfront.net/28072023/smil:asianetmovies.smil/chunklist_b1928000.m3u8', color:'linear-gradient(135deg,#7c2d12,#ea580c)' },
  { id:'ml-24-news', name:'24 News', group:'Malayalam', country:'India', logo:'24', url:'https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8', color:'linear-gradient(135deg,#dc2626,#7f1d1d)' },
  { id:'ml-harvest-english', name:'Harvest English', group:'Malayalam', country:'India', logo:'H', url:'https://7mbd4ogkr3gx-hls-live.wmncdn.net/harvestenglish/d1796a22d24e8696c7d5d0b5c349fdd2.sdp/index.m3u8', color:'linear-gradient(135deg,#0f766e,#14b8a6)' },
  { id:'ml-pishow-1530', name:'Malayalam Channel (PiShow 1530)', group:'Malayalam', country:'India', logo:'TV', url:'https://cdn.pishow.tv/ott/live/1530/master.m3u8', color:'linear-gradient(135deg,#475569,#2563eb)' },
  { id:'ml-anand-tv', name:'Anand TV', group:'Malayalam', country:'United Kingdom', logo:'AT', url:'https://live-anandtv.anandmedia.net/anandtvapp/anandtv/index.m3u8', color:'linear-gradient(135deg,#0e7490,#2563eb)' },
  { id:'ml-channel-22', name:'Malayalam Live 22', group:'Malayalam', country:'India', logo:'22', url:'https://d2lk5u59tns74c.cloudfront.net/out/v1/c313674ffced4c9a90f1bba436df2b9b/index.m3u8', color:'linear-gradient(135deg,#475569,#7c3aed)' },
  { id:'ml-jaihind', name:'Jaihind TV', group:'Malayalam', country:'India', logo:'J', url:'https://yuppnimrestreammum.akamaized.net/260723/smil:jaihind1.smil/playlist.m3u8?hdnts=st=1735898689~exp=1835898688~acl=%2a~hmac=f5fe24724fe05481e3841f9eb5ab8efdee0a3dd83645ae9dcf45703f525bab7b', color:'linear-gradient(135deg,#15803d,#0f766e)' },
  { id:'ml-janam', name:'Janam TV', group:'Malayalam', country:'India', logo:'J', url:'https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/janamtv_nim_https/140622/janamtv/playlist.m3u8', color:'linear-gradient(135deg,#b45309,#dc2626)' },
  { id:'ml-pishow-1467', name:'Malayalam Channel (PiShow 1467)', group:'Malayalam', country:'India', logo:'TV', url:'https://cdn.pishow.tv/ott/live/1467/master.m3u8', color:'linear-gradient(135deg,#475569,#2563eb)' },
  { id:'ml-victers', name:'KITE VICTERS', group:'Malayalam', country:'India', logo:'V', url:'https://932y4x26ljv8-hls-live.5centscdn.com/victers/tv.stream/playlist.m3u8', color:'linear-gradient(135deg,#0f766e,#2563eb)' },
  { id:'ml-mathrubhumi-news', name:'Mathrubhumi News', group:'Malayalam', country:'India', logo:'MB', url:'https://streams.tangotv.in/MATHRUBHUMINEWS/ORIGIN/index.m3u8', color:'linear-gradient(135deg,#1d4ed8,#dc2626)' },
  { id:'ml-media-one', name:'MediaOne', group:'Malayalam', country:'India', logo:'M1', url:'https://cdn.pishow.tv/ott/live/1481/master.m3u8', color:'linear-gradient(135deg,#0369a1,#0f172a)' },
  { id:'ml-channel-30', name:'Malayalam Live 30', group:'Malayalam', country:'India', logo:'30', url:'https://5a1178b42cc03.streamlock.net/8210/8210/playlist.m3u8', color:'linear-gradient(135deg,#475569,#64748b)' },
  { id:'ml-utv', name:'UTV Malayalam Feed', group:'Malayalam', country:'India', logo:'UTV', url:'https://em4qj6nedyvg-hls-live.wmncdn.net/utv/ab2de115318ae40bdd434e193a2f2e7f.sdp/playlist.m3u8', color:'linear-gradient(135deg,#7c3aed,#db2777)' },
  { id:'ml-channel-32', name:'Malayalam Live 32', group:'Malayalam', country:'India', logo:'32', url:'https://5a1178b42cc03.streamlock.net/8220/8220/playlist.m3u8', color:'linear-gradient(135deg,#475569,#64748b)' },
  { id:'ml-pishow-447', name:'Malayalam Channel (PiShow 447)', group:'Malayalam', country:'India', logo:'TV', url:'https://cdn.pishow.tv/ott/live/447/master.m3u8', color:'linear-gradient(135deg,#475569,#2563eb)' },
  { id:'ml-safari', name:'Safari TV', group:'Malayalam', country:'India', logo:'ST', url:'https://j78dp346yq5r-hls-live.5centscdn.com/safari/live.stream/playlist.m3u8', color:'linear-gradient(135deg,#15803d,#a16207)' },
  { id:'ml-pishow-1510', name:'Malayalam Channel (PiShow 1510)', group:'Malayalam', country:'India', logo:'TV', url:'https://cdn.pishow.tv/ott/live/1510/master.m3u8', color:'linear-gradient(135deg,#475569,#2563eb)' },
  { id:'ml-pulari', name:'Pulari TV', group:'Malayalam', country:'India', logo:'P', url:'https://mumbai-edge.smartplaytv.in/PulariTV/index.m3u8', color:'linear-gradient(135deg,#0f766e,#65a30d)' },
  { id:'ml-pravasi', name:'Pravasi Channel', group:'Malayalam', country:'UAE', logo:'P', url:'https://m6gdavepdn93-hls-live.5centscdn.com/pravasi/d0dbe915091d400bd8ee7f27f0791303.sdp/playlist.m3u8', color:'linear-gradient(135deg,#0369a1,#0f766e)' },
]

const englishChannels = [
  { id:"en-fashion-tv", name:"Fashion TV", group:"English", country:"Global", logo:"FTV", url:"http://fashionlive.mediacdn.ru/cdn/fashiontv/playlist.m3u8", color:"linear-gradient(135deg,#be185d,#7c3aed)" },
  { id:"en-fashion-tv-secrets", name:"Fashion TV Secrets", group:"English", country:"Global", logo:"FTS", url:"https://ssai.aniview.com/api/v1/hls/stream.m3u8?AVS_SSAIID=67c0c39764ad6f7dab07aa0b&AV_APPNAME=[ADS.APP_NAME]&AV_APPPKGNAME=[ADS.APP_BUNDLE]&AV_APPSTOREURL=[ADS.APP_STORE_URL]&AV_CCPA=[ADS.US_PRIVACY]&AV_CLIENT_SECTION=ftv_secrets&AV_CONSENT=[ADS.GDPR_CONSENT]&AV_CONTENT_CAT=IAB7&AV_CONTENT_CHANNEL=&AV_CONTENT_CONTEXT=&AV_CONTENT_EPISODE=&AV_CONTENT_GENRE=fashion+and+lifestyle&AV_CONTENT_ID=[ADS.VIDAA_ADS_CONTENTID]&AV_CONTENT_KEYWORDS=&AV_CONTENT_LANGUAGE=en&AV_CONTENT_LENGTH=&AV_CONTENT_NETWORK=&AV_CONTENT_PROVIDER=FTV&AV_CONTENT_RATING=R&AV_CONTENT_SEASON=&AV_CONTENT_SERIES=&AV_CONTENT_TITLE=&AV_CONTENT_URL=&AV_DNT=[ADS.DNT]&AV_GDPR=[ADS.GDPR]&AV_HEIGHT=[ADS.H]&AV_IDFA=[ADS.IFA]&AV_IFA_TYPE=[ADS.IFA_TYPE]&AV_LANGUAGE=[ADS.DEVICE_LANGUAGE]&AV_OSVERS=[ADS.DEVICE_OSV]&AV_RTB_DEVICE_TYPE=[ADS.DEVICE_TYPE]&AV_VAUTH=[ADS.VAUTH]&AV_WIDTH=[ADS.W]&Content_Id=[ADS.ADS_CONTENTID]&ads.vidaa_ads_param=1191723366&cb=[CACHEBUSTER]&content_channel_name=ftv+-fashiontv+Secrets&content_livestream=1", color:"linear-gradient(135deg,#831843,#db2777)" },
  { id:"en-channel-13", name:"Live Channel 13", group:"English", country:"Global", logo:"13", url:"http://37.49.224.5/stream/13/index.m3u8", color:"linear-gradient(135deg,#334155,#64748b)" },
  { id:"en-discovery-turbo", name:"Discovery Turbo", group:"English", country:"Global", logo:"DT", url:"https://drk6xq0vhn.gpcdn.net/live/discovery_turbo_abr/index.m3u8", color:"linear-gradient(135deg,#0e7490,#2563eb)" },
  { id:"en-channel-9", name:"Live Channel 9", group:"English", country:"Global", logo:"9", url:"http://37.49.224.5/stream/9/index.m3u8", color:"linear-gradient(135deg,#334155,#64748b)" },
  { id:"en-discovery-science", name:"Discovery Science", group:"English", country:"Global", logo:"DS", url:"https://drk6xq0vhn.gpcdn.net/live/discovery_science_abr/index.m3u8", color:"linear-gradient(135deg,#0369a1,#7c3aed)" },
  { id:"en-channel-12", name:"Live Channel 12", group:"English", country:"Global", logo:"12", url:"http://37.49.224.5/stream/12/index.m3u8", color:"linear-gradient(135deg,#334155,#64748b)" },
  { id:"en-channel-11", name:"Live Channel 11", group:"English", country:"Global", logo:"11", url:"http://37.49.224.5/stream/11/index.m3u8", color:"linear-gradient(135deg,#334155,#64748b)" },
  { id:"en-discovery-channel", name:"Discovery Channel", group:"English", country:"Global", logo:"D", url:"https://streaming.aurora.enhanced.live/live/mpc/enl0eG1mLmVncmVzcy5mZDJ2eHI=/out/v1/IT_SIMULCAST/DISCOVERYCHANNEL/CMAF/index.m3u8", color:"linear-gradient(135deg,#1d4ed8,#0891b2)" },
  { id:"en-channel-64733", name:"Live Channel 64733", group:"English", country:"Global", logo:"TV", url:"https://sdn-global-live-streaming-packager-cache.3qsdn.com/64733/64733_264_live.m3u8", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-channel-13456", name:"Live Channel 13456", group:"English", country:"Global", logo:"TV", url:"https://sdn-global-live-streaming-packager-cache.3qsdn.com/13456/13456_264_live.m3u8", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-cinema", name:"Cinema Live", group:"English", country:"Global", logo:"CIN", url:"http://flussonic.linkintel.ru/cinema/index.m3u8", color:"linear-gradient(135deg,#7c2d12,#ea580c)" },
  { id:"en-channel-8", name:"Live Channel 8", group:"English", country:"Global", logo:"8", url:"https://gra1.crystalweb.net:1936/channel8/channel8/playlist.m3u8", color:"linear-gradient(135deg,#334155,#64748b)" },
  { id:"en-dance-tv", name:"Dance Television", group:"English", country:"Global", logo:"DTV", url:"https://m1b2.worldcast.tv/dancetelevisionone/dancetelevisionone.m3u8", color:"linear-gradient(135deg,#7e22ce,#db2777)" },
  { id:"en-tubi-live", name:"Tubi Live Channel", group:"English", country:"Global", logo:"T", url:"https://aegis-cloudfront-1.tubi.video/bb1fc6ad-9948-42ea-aaf3-20acfcdeecac/playlist.m3u8", color:"linear-gradient(135deg,#15803d,#65a30d)" },
  { id:"en-adventure-earth", name:"Adventure Earth", group:"English", country:"Global", logo:"AE", url:"https://a57e9c69976649b582a8d7604c00e69a.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/RlaxxTV-eu_AdventureEarth/playlist.m3u8", color:"linear-gradient(135deg,#166534,#0e7490)" },
  { id:"en-a2i-music", name:"A2i Music", group:"English", country:"Global", logo:"♪", url:"https://stream.sen-gt.com/A2iMusic/myStream/playlist.m3u8", color:"linear-gradient(135deg,#7c3aed,#db2777)" },
  { id:"en-persiana-music", name:"Persiana Music", group:"English", country:"Global", logo:"PM", url:"https://musichls.persiana.live/hls/stream.m3u8", color:"linear-gradient(135deg,#be185d,#7c3aed)" },
  { id:"en-1hd", name:"1HD Music", group:"English", country:"Global", logo:"1HD", url:"http://176.118.197.101/1HD/index.m3u8", color:"linear-gradient(135deg,#0369a1,#7c3aed)" },
  { id:"en-mtv2", name:"MTV 2", group:"English", country:"Global", logo:"MTV2", url:"http://198.58.104.90:8989/mtv2/index.m3u8", color:"linear-gradient(135deg,#7c3aed,#db2777)" },
  { id:"en-mtv3", name:"MTV3", group:"English", country:"Global", logo:"MTV3", url:"https://live-fi.tvkaista.net/mtv3/live.m3u8", color:"linear-gradient(135deg,#1d4ed8,#0891b2)" },
  { id:"en-axn-black", name:"AXN Black", group:"English", country:"Global", logo:"AXN", url:"http://50.7.120.34:8080/AXN_BLACK/index.m3u8", color:"linear-gradient(135deg,#111827,#7f1d1d)" },
  { id:"en-stream-a02w", name:"Live Channel A02W", group:"English", country:"Global", logo:"TV", url:"http://103.151.60.162:2122/play/a02w/index.m3u8?hls", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-stream-a02k", name:"Live Channel A02K", group:"English", country:"Global", logo:"TV", url:"http://103.151.60.162:2122/play/a02k/index.m3u8?hls", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-amg-channel", name:"AMG Live Channel", group:"English", country:"Global", logo:"AMG", url:"https://shd-amg-fast.edgenextcdn.net/tx011/playlist.m3u8", color:"linear-gradient(135deg,#0f766e,#2563eb)" },
  { id:"en-stream-a01d", name:"Live Channel A01D", group:"English", country:"Global", logo:"TV", url:"http://103.151.60.162:2122/play/a01d/index.m3u8?hls", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-hbo3", name:"HBO 3 HD", group:"English", country:"Global", logo:"HBO3", url:"http://88.212.15.17/live/test_hbo3_hd_hevc/playlist.m3u8", color:"linear-gradient(135deg,#111827,#b91c1c)" },
  { id:"en-channel-243", name:"Live Channel 243", group:"English", country:"Global", logo:"243", url:"http://57.128.231.171:8080/243/index.m3u8", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-channel-245", name:"Live Channel 245", group:"English", country:"Global", logo:"245", url:"http://57.128.231.171:8080/245/index.m3u8", color:"linear-gradient(135deg,#475569,#2563eb)" },
  { id:"en-hbo-signature", name:"HBO Signature", group:"English", country:"Global", logo:"HBO", url:"http://202.150.165.66:8088/play/101-HBOSignature/index.m3u8", color:"linear-gradient(135deg,#111827,#7f1d1d)" },
  { id:"en-wurl-entertainment", name:"WURL Entertainment", group:"English", country:"Global", logo:"W", url:"https://connection3-ent-nz.samsung.wurl.tv/playlist.m3u8", color:"linear-gradient(135deg,#0369a1,#7c3aed)" },
]


const dramaCartoonChannels = [
  { id:'dc-cineverse', name:'Cineverse', group:'Drama & Cartoons', country:'Global', logo:'CV', url:'https://linear-900.frequency.stream/dist/cineverse/900/hls/master/playlist.m3u8', color:'linear-gradient(135deg,#7c3aed,#db2777)' },
  { id:'dc-live-11', name:'Drama Live 11', group:'Drama & Cartoons', country:'Global', logo:'11', url:'http://103.172.187.30:12000/stream/mytv/null-11/master.m3u8', color:'linear-gradient(135deg,#334155,#7c3aed)' },
  { id:'dc-baby-shark', name:'Baby Shark TV', group:'Drama & Cartoons', country:'Global', logo:'BS', url:'https://newidco-babysharktv-1-us.roku.wurl.tv/playlist.m3u8', color:'linear-gradient(135deg,#0284c7,#06b6d4)' },
  { id:'dc-cartoon-network-sd', name:'Cartoon Network SD', group:'Drama & Cartoons', country:'Global', logo:'CN', url:'https://drk6xq0vhn.gpcdn.net/live/cn_sd_abr/index.m3u8', color:'linear-gradient(135deg,#2563eb,#7c3aed)' },
  { id:'dc-cartoon-network-alt', name:'Cartoon Network (Alternate Feed)', group:'Drama & Cartoons', country:'Global', logo:'CN', url:'https://vodzong.mjunoon.tv:8087/streamtest/cartoon-network-87/live/87H/chunks.m3u8', color:'linear-gradient(135deg,#2563eb,#7c3aed)' },
  { id:'dc-live-a013', name:'Kids / Drama Live A013', group:'Drama & Cartoons', country:'Global', logo:'TV', url:'http://176.65.153.40:6002/play/a013/index.m3u8', color:'linear-gradient(135deg,#475569,#0e7490)' },
  { id:'dc-cartoon-network-hd', name:'Cartoon Network HD', group:'Drama & Cartoons', country:'Global', logo:'CN HD', url:'https://drk6xq0vhn.gpcdn.net/live/cn_hd_abr/index.m3u8', color:'linear-gradient(135deg,#1d4ed8,#db2777)' },
  { id:'dc-discovery-kids', name:'Discovery Kids', group:'Drama & Cartoons', country:'Global', logo:'DK', url:'https://drk6xq0vhn.gpcdn.net/live/discovery_kids_abr/index.m3u8', color:'linear-gradient(135deg,#0f766e,#65a30d)' },
  { id:'dc-disney-junior', name:'Disney Junior', group:'Drama & Cartoons', country:'Global', logo:'DJ', url:'http://88.212.15.50/live/test_disney_junior/playlist.m3u8', color:'linear-gradient(135deg,#be185d,#7c3aed)' },
  { id:'dc-disney-junior-proxy', name:'Disney Junior (Alternate Feed)', group:'Drama & Cartoons', country:'Global', logo:'DJ', url:'https://directv-iptv-player.vercel.app/api/stream?url=http%3A%2F%2F212.5.144.156%3A8080%2Fdisneyjr%2Ftracks-v1a1%2Fmono.m3u8', color:'linear-gradient(135deg,#be185d,#7c3aed)' },
  { id:'dc-kids-live-1368', name:'Kids Live 1368', group:'Drama & Cartoons', country:'Global', logo:'TV', url:'http://89.187.179.148:826/1368/gXwiagaXda/1672', color:'linear-gradient(135deg,#475569,#0891b2)' },
  { id:'dc-nickelodeon', name:'Nickelodeon', group:'Drama & Cartoons', country:'Global', logo:'NICK', url:'http://198.58.104.90:8989/nickelodeon/index.m3u8', color:'linear-gradient(135deg,#ea580c,#facc15)' },
]

const tamilChannels = [
  { id:'ta-sun-tv', name:'Sun TV', group:'Tamil', country:'India', logo:'SUN', url:'https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8', color:'linear-gradient(135deg,#dc2626,#f97316)' },
  { id:'ta-prime-tv', name:'Prime TV', group:'Tamil', country:'India', logo:'PTV', url:'https://live.applelive.in/primetv/primetv/index.m3u8', color:'linear-gradient(135deg,#1d4ed8,#7c3aed)' },
  { id:'ta-star-vijay-uk', name:'Star Vijay UK', group:'Tamil', country:'United Kingdom', logo:'VJ', url:'https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8', color:'linear-gradient(135deg,#7c3aed,#db2777)' },
  { id:'ta-velavan-tv', name:'Velavan TV', group:'Tamil', country:'India', logo:'VT', url:'https://stream.ipcloud.live/velavantv/velavantvhd/index.m3u8', color:'linear-gradient(135deg,#0f766e,#65a30d)' },
  { id:'ta-moon-tv', name:'Moon TV', group:'Tamil', country:'India', logo:'MOON', url:'https://live.sscloud7.in/live/moontv/index.m3u8', color:'linear-gradient(135deg,#1e3a8a,#6366f1)' },
  { id:'ta-zee-tamil-hd', name:'Zee Tamil HD', group:'Tamil', country:'India', logo:'ZEE', url:'https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8', color:'linear-gradient(135deg,#b91c1c,#ea580c)' },
  { id:'ta-colors-tamil-hd', name:'Colors Tamil HD', group:'Tamil', country:'India', logo:'CT', url:'https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorstamilhd11.smil/playlist.m3u8', color:'linear-gradient(135deg,#7c3aed,#ec4899)' },
]

const sportsChannels = [
  { id:'sports-sdmedia', name:'SD Media Sports', group:'Sports', country:'India', logo:'SDM', url:'https://real-vk.proxy.nellaiiptv.com/SDMEDIA/index.m3u8', color:'linear-gradient(135deg,#0f766e,#22c55e)' },
  { id:'sports-eurosport-hd', name:'Eurosport HD', group:'Sports', country:'Global', logo:'EURO', url:'https://drk6xq0vhn.gpcdn.net/live/euro_sports_hd_abr/index.m3u8', color:'linear-gradient(135deg,#1d4ed8,#7c3aed)' },
  { id:'sports-pishow-1161', name:'Sports Channel (PiShow 1161)', group:'Sports', country:'Global', logo:'1161', url:'https://cdn.pishow.tv/ott/live/1161/master.m3u8', color:'linear-gradient(135deg,#ea580c,#dc2626)' },
  { id:'sports-a026', name:'Sports Channel A026', group:'Sports', country:'Global', logo:'A026', url:'http://103.151.60.162:2122/play/a026/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a027', name:'Sports Channel A027', group:'Sports', country:'Global', logo:'A027', url:'http://103.151.60.162:2122/play/a027/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a029', name:'Sports Channel A029', group:'Sports', country:'Global', logo:'A029', url:'http://103.151.60.162:2122/play/a029/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-ayna', name:'Ayna Sports Feed', group:'Sports', country:'Global', logo:'AYNA', url:'https://tvsen5.aynaott.com/cXPB2LKkErN9/index.m3u8', color:'linear-gradient(135deg,#0e7490,#2563eb)' },
  { id:'sports-a01c', name:'Sports Channel A01C', group:'Sports', country:'Global', logo:'A01C', url:'http://103.151.60.162:2122/play/a01c/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a01b', name:'Sports Channel A01B', group:'Sports', country:'Global', logo:'A01B', url:'http://103.151.60.162:2122/play/a01b/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a01t', name:'Sports Channel A01T', group:'Sports', country:'Global', logo:'A01T', url:'http://103.151.60.162:2122/play/a01t/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a021', name:'Sports Channel A021', group:'Sports', country:'Global', logo:'A021', url:'http://103.151.60.162:2122/play/a021/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-a028', name:'Sports Channel A028', group:'Sports', country:'Global', logo:'A028', url:'http://103.151.60.162:2122/play/a028/index.m3u8?hls', color:'linear-gradient(135deg,#334155,#2563eb)' },
  { id:'sports-fifa-plus-women', name:'FIFA+ Women', group:'Sports', country:'Global', logo:'FIFA+', url:'https://cffda8ff.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/U2Ftc3VuZy1nYl9GSUZBUGx1c3dvbWVuX0hMUw/playlist.m3u8', color:'linear-gradient(135deg,#15803d,#0f766e)' },
  { id:'sports-pluto-feed', name:'Sports Channel (Pluto feed)', group:'Sports', country:'Global', logo:'PLU', url:'https://jmp2.uk/plu-660bfc032433010008def35a.m3u8', color:'linear-gradient(135deg,#7c3aed,#db2777)' },
]

const hindiChannels = [
  { id:'hindi-hindi-hits', name:'Hindi Hits', group:'Hindi', country:'India', logo:'HITS', url:'https://samitaorigin.tangotv.in/HINDIHITS/SAMITAORIGIN/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-channel-227', name:'Hindi Channel 227', group:'Hindi', country:'India', logo:'227', url:'http://57.128.231.171:8080/227/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-channel-a00y', name:'Hindi Channel A00Y', group:'Hindi', country:'India', logo:'A00Y', url:'http://92.114.85.87:8001/play/a00y/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-music-india', name:'Music India', group:'Hindi', country:'India', logo:'MI', url:'https://streams.tangotv.in/MUSICINDIA/ORIGIN/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-channel-a00a', name:'Hindi Channel A00A', group:'Hindi', country:'India', logo:'A00A', url:'http://92.114.85.87:8016/play/a00a/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-pishow-419', name:'Hindi Channel (PiShow 419)', group:'Hindi', country:'India', logo:'419', url:'https://cdn.pishow.tv/ott/live/419/master.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-mbc-bollywood', name:'MBC Bollywood', group:'Hindi', country:'India', logo:'MBC', url:'https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-bollywood/546eb40d7dcf9a209255dd2496903764/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-zee-cinema-apac', name:'Zee Cinema APAC', group:'Hindi', country:'India', logo:'ZEE', url:'https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/sg/YuppTV/ZeeCinemaAPAC.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-7x-punjabi', name:'7x Punjabi', group:'Hindi', country:'India', logo:'7X', url:'https://cdn2.in/7xPunjabihls/live.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-channel-131m', name:'Hindi Channel 131M', group:'Hindi', country:'India', logo:'131M', url:'https://cdn4.mjunoon.tv:8087/streamtest/131M/chunks.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-9x-jalwa', name:'9X Jalwa', group:'Hindi', country:'India', logo:'9XJ', url:'https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-9x-jhakaas', name:'9X Jhakaas', group:'Hindi', country:'India', logo:'9XJ', url:'https://amg01281-9xmediapvtltd-9xjhakaas-samsungin-ci2cs.amagi.tv/playlist/amg01281-9xmediapvtltd-9xjhakaas-samsungin/playlist.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-9xm', name:'9XM', group:'Hindi', country:'India', logo:'9XM', url:'https://wiselp.wiseplayout.com/9XM/master.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-9x-tashan', name:'9X Tashan', group:'Hindi', country:'India', logo:'9XT', url:'https://wiselp.wiseplayout.com/9X_Tashan/master.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-animal-planet-sd', name:'Animal Planet SD', group:'Hindi', country:'India', logo:'AP', url:'https://drk6xq0vhn.gpcdn.net/live/animal_planet_sd_abr/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-tangotv-feed', name:'Hindi Channel (TangoTV feed)', group:'Hindi', country:'India', logo:'TV', url:'https://mumt06.tangotv.in/qYyB8fXVB4UKADAK/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-b4u-movies', name:'B4U Movies', group:'Hindi', country:'India', logo:'B4U', url:'https://streams.tangotv.in/B4UMOVIES/ORIGIN/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-bollywood-hd', name:'Bollywood HD', group:'Hindi', country:'India', logo:'BHD', url:'http://176.118.197.101/Bollywood_HD/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-bollywood-sd', name:'Bollywood SD', group:'Hindi', country:'India', logo:'BSD', url:'https://hls02ns.antenaplay.ro/hls/bollywood-sd/index.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-colors-cineplex-uk', name:'Colors Cineplex UK', group:'Hindi', country:'India', logo:'CC', url:'https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/gb/YuppTV/ColorsCineplexUK.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-channel-159', name:'Hindi Channel 159', group:'Hindi', country:'India', logo:'159', url:'https://fta.ektv.in/live/159/master.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-feed-1', name:'Hindi Entertainment Feed 1', group:'Hindi', country:'India', logo:'H1', url:'https://cc-t8lqe1o99pszu.akamaized.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-t8lqe1o99pszu/playlist.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'hindi-feed-2', name:'Hindi Entertainment Feed 2', group:'Hindi', country:'India', logo:'H2', url:'https://cc-3cyxq80qusspd.akamaized.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-3cyxq80qusspd/playlist.m3u8', color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
]

const starterChannels = [
  ...malayalamChannels,
  ...englishChannels,
  ...dramaCartoonChannels,
  ...tamilChannels,
  ...sportsChannels,
  ...hindiChannels,
  { id:'demo-1', name:'MALLU TV Demo', group:'Featured', country:'Global', logo:'M', url:'', note:'Add your own stream URL to start watching.', color:'linear-gradient(135deg,#1c87ff,#7c3aed)' },
  { id:'demo-3', name:'World News', group:'News', country:'Global', logo:'N', url:'', note:'Sample channel placeholder', color:'linear-gradient(135deg,#dc2626,#fb923c)' },
  { id:'demo-4', name:'Sports Arena', group:'Sports', country:'Global', logo:'S', url:'', note:'Sample channel placeholder', color:'linear-gradient(135deg,#ea580c,#eab308)' },
  { id:'demo-5', name:'Cinema Plus', group:'Movies', country:'Global', logo:'C', url:'', note:'Sample channel placeholder', color:'linear-gradient(135deg,#9333ea,#ec4899)' },
  { id:'demo-6', name:'Music Lounge', group:'Entertainment', country:'Global', logo:'♪', url:'', note:'Sample channel placeholder', color:'linear-gradient(135deg,#0891b2,#6366f1)' },
]

const navItems = [
  { id:'home', label:'Home', icon:Home },
  { id:'live', label:'Live TV', icon:Radio },
  { id:'sports', label:'Sports', icon:Trophy },
  { id:'movies', label:'Movies & Shows', icon:Film },
  { id:'news', label:'News', icon:Newspaper },
  { id:'favorites', label:'My Favorites', icon:Heart },
  { id:'recent', label:'Recently Watched', icon:Clock3 },
]

const publicChannelPacks = [
  { id:'pack-hindi', name:'Hindi Channels', group:'Hindi', description:'Hindi-language TV', url:'https://dearbulut.github.io/iptv/playlists/language/hin.m3u', icon:Globe2, color:'linear-gradient(135deg,#b91c1c,#f59e0b)' },
  { id:'pack-tamil', name:'Tamil Channels', group:'Tamil', description:'Tamil-language TV', url:'https://dearbulut.github.io/iptv/playlists/language/tam.m3u', icon:Globe2, color:'linear-gradient(135deg,#0f766e,#2dd4bf)' },
  { id:'pack-english', name:'English Channels', group:'English', description:'English-language TV', url:'https://dearbulut.github.io/iptv/playlists/language/eng.m3u', icon:Globe2, color:'linear-gradient(135deg,#1d4ed8,#60a5fa)' },
  { id:'pack-entertainment', name:'Entertainment', group:'Entertainment', description:'General entertainment', url:'https://dearbulut.github.io/iptv/playlists/category/entertainment.m3u', icon:Tv, color:'linear-gradient(135deg,#7c3aed,#c084fc)' },
  { id:'pack-movies', name:'Movies & Cinema', group:'Movies', description:'Movie channels', url:'https://dearbulut.github.io/iptv/playlists/category/movies.m3u', icon:Film, color:'linear-gradient(135deg,#9a3412,#fb923c)' },
  { id:'pack-kids', name:'Kids & Cartoons', group:'Kids', description:'Kids and animation channels', url:'https://dearbulut.github.io/iptv/playlists/category/kids.m3u', icon:Tv, color:'linear-gradient(135deg,#a21caf,#f0abfc)' },
  { id:'pack-sports', name:'Sports', group:'Sports', description:'Sports channels', url:'https://dearbulut.github.io/iptv/playlists/category/sports.m3u', icon:Trophy, color:'linear-gradient(135deg,#166534,#4ade80)' },
  { id:'pack-tamil-local', name:'Tamil Local TV', group:'Tamil Local', description:'Local Tamil cable channels', url:'https://tinyurl.com/amaze-tamil-local-tv-withproxy', icon:Radio, color:'linear-gradient(135deg,#9f1239,#fb7185)' },
]


function parseM3U(text, sourceName='Imported playlist') {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).map(l => l.trim())
  const channels = []
  let meta = {}
  for (const line of lines) {
    if (!line) continue
    if (line.startsWith('#EXTINF')) {
      const attrs = {}
      for (const match of line.matchAll(/([\w-]+)="([^"]*)"/g)) attrs[match[1]] = match[2]
      const comma = line.lastIndexOf(',')
      const name = (comma >= 0 ? line.slice(comma + 1).trim() : '') || attrs['tvg-name'] || 'Untitled channel'
      meta = {
        name,
        logo: attrs['tvg-logo'] || '',
        group: attrs['group-title'] || 'Other',
        country: attrs['tvg-country'] || 'Unknown',
        tvgId: attrs['tvg-id'] || '',
      }
    } else if (!line.startsWith('#') && meta.name) {
      channels.push({
        id: `${Date.now()}-${channels.length}-${Math.random().toString(36).slice(2,7)}`,
        name: meta.name,
        group: meta.group || 'Other',
        country: meta.country || 'Unknown',
        logo: meta.logo,
        url: line,
        source: sourceName,
        tvgId: meta.tvgId,
        color: 'linear-gradient(135deg,#1d4ed8,#7c3aed)'
      })
      meta = {}
    }
  }
  return channels
}

function loadSaved() {
  try {
    const raw = localStorage.getItem('mallu-tv-playlists')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
function loadIds(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

export default function App() {
  const [page, setPage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [importTab, setImportTab] = useState('url')
  const [playlistUrl, setPlaylistUrl] = useState('')
  const [playlistName, setPlaylistName] = useState('')
  const [importError, setImportError] = useState('')
  const [playlists, setPlaylists] = useState(loadSaved)
  const [favorites, setFavorites] = useState(loadIds('mallu-tv-favorites'))
  const [recent, setRecent] = useState(loadIds('mallu-tv-recent'))
  const [selected, setSelected] = useState(starterChannels[0])
  const [notice, setNotice] = useState('')
  const [category, setCategory] = useState('All channels')
  const [guideOpen, setGuideOpen] = useState(true)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [quality, setQuality] = useState('Auto')
  const [channelListLimit, setChannelListLimit] = useState(300)
  const [volume, setVolume] = useState(0.8)
  const [showSettings, setShowSettings] = useState(false)
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const fileRef = useRef(null)

  const importedChannels = useMemo(() => playlists.flatMap(p => p.channels || []), [playlists])
  const allChannels = useMemo(() => [...starterChannels, ...importedChannels], [importedChannels])
  const channelGroups = useMemo(() => ['All channels', ...new Set(allChannels.map(c => c.group || 'Other'))], [allChannels])
  const filteredChannels = useMemo(() => {
    let items = allChannels
    if (page === 'favorites') items = items.filter(c => favorites.includes(c.id))
    else if (page === 'recent') items = items.filter(c => recent.includes(c.id))
    else if (page === 'sports') items = items.filter(c => /sport/i.test(c.group + ' ' + c.name))
    else if (page === 'movies') items = items.filter(c => /movie|cinema|film|entertain/i.test(c.group + ' ' + c.name))
    else if (page === 'news') items = items.filter(c => /news/i.test(c.group + ' ' + c.name))
    if (category !== 'All channels' && ['live','home'].includes(page)) items = items.filter(c => c.group === category)
    if (search.trim()) items = items.filter(c => `${c.name} ${c.group} ${c.country}`.toLowerCase().includes(search.toLowerCase()))
    return items
  }, [allChannels, page, favorites, recent, category, search])

  useEffect(() => { try { localStorage.setItem('mallu-tv-playlists', JSON.stringify(playlists)) } catch { setNotice('Your browser storage is full. Remove a large playlist or export your channel list before adding more.') } }, [playlists])
  useEffect(() => { localStorage.setItem('mallu-tv-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('mallu-tv-recent', JSON.stringify(recent)) }, [recent])

  useEffect(() => { setChannelListLimit(300) }, [page, category, search])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !selected?.url) {
      if (hlsRef.current) { if (typeof hlsRef.current.destroy === 'function') hlsRef.current.destroy(); else if (typeof hlsRef.current.reset === 'function') hlsRef.current.reset(); hlsRef.current = null }
      setPlaying(false)
      return
    }
    if (hlsRef.current) { if (typeof hlsRef.current.destroy === 'function') hlsRef.current.destroy(); else if (typeof hlsRef.current.reset === 'function') hlsRef.current.reset(); hlsRef.current = null }
    video.pause()
    video.removeAttribute('src')
    video.load()
    setNotice('')
    const isHls = /\.m3u8($|[?#])/i.test(selected.url) || selected.url.toLowerCase().includes('.m3u8')
    const isDash = /\.mpd($|[?#])/i.test(selected.url)
    const isRtmp = /^rtmp(s)?:/i.test(selected.url)
    let mediaRecoveryUsed = false
    let networkRetries = 0
    if (isRtmp) {
      setNotice('This playlist entry uses RTMP, which browsers cannot play directly. Use an HTTPS/HLS playlist version or a provider-supported browser stream.')
    } else if (isDash && dashjs.supportsMediaSource()) {
      const dash = dashjs.MediaPlayer().create()
      hlsRef.current = dash
      dash.initialize(video, selected.url, true)
      dash.updateSettings({ streaming: { buffer: { bufferTimeAtTopQuality: 20, bufferTimeAtTopQualityLongForm: 30 }, retryAttempts: { MPD: 3, MediaSegment: 4 }, retryIntervals: { MPD: 1000, MediaSegment: 1000 } } })
      dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        video.play().then(() => setPlaying(true)).catch(() => setNotice('Press Play to start this DASH stream.'))
      })
      dash.on(dashjs.MediaPlayer.events.ERROR, () => setNotice('DASH playback failed. The stream may be offline, blocked by CORS, or use an unsupported codec.'))
    } else if (isHls && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,
        startLevel: -1,
        abrEwmaDefaultEstimate: 500000,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        backBufferLength: 30,
        manifestLoadingTimeOut: 20000,
        levelLoadingTimeOut: 20000,
        fragLoadingTimeOut: 30000,
        fragLoadingMaxRetry: 4,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetryTimeout: 8000,
        manifestLoadingMaxRetry: 3,
        levelLoadingMaxRetry: 3
      })
      hlsRef.current = hls
      hls.loadSource(selected.url)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().then(() => setPlaying(true)).catch(() => setNotice('Press Play to start this stream. Some browsers block autoplay.'))
      })
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && networkRetries < 2) {
          networkRetries += 1
          setNotice('Connection interrupted. Trying to reconnect…')
          window.setTimeout(() => { if (hlsRef.current === hls) hls.startLoad() }, 1200 * networkRetries)
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !mediaRecoveryUsed) {
          mediaRecoveryUsed = true
          setNotice('Recovering the media decoder…')
          hls.recoverMediaError()
        } else {
          setPlaying(false)
          setNotice('This stream is unavailable or unsupported. Check the URL, CORS, codec, and provider permissions.')
          hls.destroy()
          if (hlsRef.current === hls) hlsRef.current = null
        }
      })
    } else {
      if (!isRtmp && !(isDash && dashjs.supportsMediaSource())) {
        video.src = selected.url
        video.load()
        video.play().then(() => setPlaying(true)).catch(() => setNotice('Press Play to start, or check whether this stream format is supported by your browser.'))
      }
    }
    const onVideoError = () => {
      if (video.error) setNotice('Playback failed (' + video.error.code + '). Try another stream URL or browser-supported format.')
    }
    video.addEventListener('error', onVideoError)
    setRecent(old => [selected.id, ...old.filter(id => id !== selected.id)].slice(0, 30))
    return () => {
      video.removeEventListener('error', onVideoError)
      if (hlsRef.current) { if (typeof hlsRef.current.destroy === 'function') hlsRef.current.destroy(); else if (typeof hlsRef.current.reset === 'function') hlsRef.current.reset(); hlsRef.current = null }
    }
  }, [selected?.id, selected?.url])

  useEffect(() => {
    const hls = hlsRef.current
    if (!hls || !hls.levels?.length) return
    if (quality === 'Auto') { hls.currentLevel = -1; return }
    const targetHeight = Number.parseInt(quality, 10)
    const candidates = hls.levels.map((level, index) => ({ index, height: level.height || 0 }))
    const exact = candidates.filter(level => level.height <= targetHeight).sort((a, b) => b.height - a.height)[0]
    if (exact) hls.currentLevel = exact.index
  }, [quality, selected?.id])

  useEffect(() => {
    if (videoRef.current) { videoRef.current.volume = volume; videoRef.current.muted = muted }
  }, [volume, muted])

  async function addPlaylistFromUrl() {
    setImportError('')
    const url = playlistUrl.trim()
    if (!url) return setImportError('Enter a playlist URL first.')
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Request failed (${response.status}).`)
      const text = await response.text()
      const parsed = parseM3U(text, playlistName.trim() || 'Playlist URL')
      if (!parsed.length) throw new Error('No channels were found. Confirm this is a valid M3U playlist.')
      setPlaylists(old => [...old, { id: crypto.randomUUID(), name: playlistName.trim() || 'Playlist URL', source: url, channels: parsed, addedAt: new Date().toISOString() }])
      setPlaylistUrl(''); setPlaylistName(''); setShowImport(false)
      setNotice(`Imported ${parsed.length} channels successfully.`)
    } catch (err) {
      setImportError(`${err.message || 'Unable to load playlist.'} Some providers block browser requests (CORS); try uploading the M3U file or use a compatible hosted playlist.`)
    }
  }

  async function addChannelPack(pack) {
    const existing = playlists.find(p => p.source === pack.url)
    if (existing) {
      setNotice(`${pack.name} is already in your playlist library.`)
      setPage('live')
      setCategory(pack.group)
      return
    }
    setNotice(`Loading ${pack.name}…`)
    try {
      const response = await fetch(pack.url)
      if (!response.ok) throw new Error(`Playlist request failed (${response.status}).`)
      const text = await response.text()
      const parsed = parseM3U(text, pack.name)
      if (!parsed.length) throw new Error('No channels were found in this playlist.')
      const channels = parsed.map(channel => ({ ...channel, id: `${pack.id}-${channel.id}`, group: pack.group, color: pack.color }))
      setPlaylists(old => old.some(p => p.source === pack.url) ? old : [...old, { id: crypto.randomUUID(), name: pack.name, source: pack.url, channels, addedAt: new Date().toISOString() }])
      setPage('live')
      setCategory(pack.group)
      setNotice(`Added ${channels.length} channels from ${pack.name}. Some streams may be offline or unsupported in browsers.`)
    } catch (err) {
      setNotice(`Couldn't load ${pack.name}: ${err.message || 'Playlist unavailable'}. The source may block browser access (CORS). Try its playlist URL in an external player or download and import the M3U file.`)
    }
  }

  function importFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const parsed = parseM3U(String(reader.result || ''), file.name)
      if (!parsed.length) { setImportError('No channels found. Choose a valid .m3u or .m3u8 playlist file.'); setShowImport(true); return }
      setPlaylists(old => [...old, { id: crypto.randomUUID(), name: playlistName.trim() || file.name, source: 'local file', channels: parsed, addedAt: new Date().toISOString() }])
      setShowImport(false); setImportError(''); setPlaylistName('')
      setNotice(`Imported ${parsed.length} channels from ${file.name}.`)
    }
    reader.onerror = () => { setImportError('Could not read that file.'); setShowImport(true) }
    reader.readAsText(file)
  }

  function selectChannel(channel) {
    setSelected(channel)
    if (channel.url) setNotice('')
    else setNotice(`${channel.name} is a sample tile. Import a playlist or add a playable stream URL to watch live TV.`)
    setSidebarOpen(false)
  }
  function toggleFavorite(channel) {
    setFavorites(old => old.includes(channel.id) ? old.filter(id => id !== channel.id) : [...old, channel.id])
  }
  function removePlaylist(id) {
    const p = playlists.find(item => item.id === id)
    setPlaylists(old => old.filter(item => item.id !== id))
    if (p?.channels?.some(c => c.id === selected.id)) setSelected(starterChannels[0])
  }
  function openPopupPlayer() {
    if (!selected?.url) { setShowImport(true); setNotice('Choose a channel or import a playlist first.'); return }
    const popup = window.open('', 'mallu-tv-pro-player', 'popup=yes,width=1100,height=720,resizable=yes,scrollbars=no')
    if (!popup) { setNotice('Your browser blocked the pop-up. Allow pop-ups for this site and try again.'); return }
    popup.document.open()
    popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MALLU TV PRO Player</title><style>
      *{box-sizing:border-box}body{margin:0;background:#070a12;color:#f4f6ff;font:14px system-ui,sans-serif}.top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;background:#111827;border-bottom:1px solid #29334a}.brand{font-weight:800;letter-spacing:.4px}.brand span{color:#83a8ff}.name{color:#aab6cc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.stage{height:calc(100vh - 112px);min-height:220px;display:grid;place-items:center;background:#02040a}video{width:100%;height:100%;object-fit:contain;background:#000}footer{display:flex;align-items:center;gap:10px;padding:12px 16px;color:#8d9bb5;font-size:12px}button,select{background:#182238;color:#eef3ff;border:1px solid #33415f;border-radius:7px;padding:8px 10px}#status{flex:1}#error{color:#ffb0bf}@media(max-width:500px){.top{padding:10px}.name{max-width:55vw}footer{flex-wrap:wrap}}
    </style></head><body><header class="top"><div class="brand">MALLU TV <span>PRO</span></div><div class="name" id="channel-name"></div></header><main class="stage"><video id="video" controls autoplay playsinline></video></main><footer><button id="retry">Retry</button><button id="pip">Picture in picture</button><select id="quality" aria-label="Stream quality"><option value="-1">Auto quality</option></select><span id="status">Connecting…</span></footer><script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js"></script><script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script><script>
      const streamUrl = ${JSON.stringify(selected.url).replace(/</g,'\\u003c')};
      const channelName = ${JSON.stringify(selected.name).replace(/</g,'\\u003c')};
      const video = document.getElementById('video'), status = document.getElementById('status'), quality = document.getElementById('quality');
      document.title = channelName + ' — MALLU TV PRO'; document.getElementById('channel-name').textContent = channelName;
      let hls = null, retryCount = 0;
      function start() {
        if (hls) { hls.destroy(); hls = null; }
        video.pause(); video.removeAttribute('src'); video.load(); status.textContent = 'Connecting…';
        if (/^rtmp(s)?:/i.test(streamUrl)) { status.innerHTML='<span id="error">RTMP streams cannot play directly in a browser. Use an HTTPS/HLS source.</span>'; return; }
        if (/\\.mpd($|[?#])/i.test(streamUrl) && window.dashjs && dashjs.supportsMediaSource()) {
          hls = dashjs.MediaPlayer().create(); hls.initialize(video,streamUrl,true);
          hls.updateSettings({streaming:{buffer:{bufferTimeAtTopQuality:20,bufferTimeAtTopQualityLongForm:30},retryAttempts:{MPD:3,MediaSegment:4},retryIntervals:{MPD:1000,MediaSegment:1000}}});
          hls.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED,()=>{status.textContent='DASH stream ready';video.play().catch(()=>status.textContent='Press Play to start')});
          hls.on(dashjs.MediaPlayer.events.ERROR,()=>status.textContent='DASH playback failed: source, CORS or codec issue.');
        } else if (/\\.m3u8($|[?#])/i.test(streamUrl) && window.Hls && Hls.isSupported()) {
          hls = new Hls({enableWorker:true, capLevelToPlayerSize:true, startLevel:-1, maxBufferLength:30, maxMaxBufferLength:60, backBufferLength:30, fragLoadingMaxRetry:4, fragLoadingRetryDelay:1000, manifestLoadingMaxRetry:3});
          hls.loadSource(streamUrl); hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => { status.textContent='Stream ready'; quality.innerHTML='<option value="-1">Auto quality</option>'; hls.levels.forEach((level,i)=>{const o=document.createElement('option');o.value=i;o.textContent=(level.height?level.height+'p':'Level '+(i+1));quality.appendChild(o)}); video.play().catch(()=>status.textContent='Press Play to start'); });
          hls.on(Hls.Events.ERROR, (_,data) => { if(!data.fatal)return; if(data.type===Hls.ErrorTypes.NETWORK_ERROR && retryCount++<2){status.textContent='Reconnecting…';setTimeout(()=>hls&&hls.startLoad(),1200*retryCount)}else if(data.type===Hls.ErrorTypes.MEDIA_ERROR){status.textContent='Recovering media…';hls.recoverMediaError()}else status.innerHTML='<span id="error">Stream unavailable or blocked by its source.</span>'; });
        } else {
          video.src=streamUrl; video.load(); video.play().then(()=>status.textContent='Playing').catch(()=>status.textContent='Press Play, or this format may not be supported by your browser.');
        }
      }
      quality.addEventListener('change',()=>{if(hls)hls.currentLevel=Number(quality.value)});
      video.addEventListener('playing',()=>status.textContent='Playing'); video.addEventListener('waiting',()=>status.textContent='Buffering…'); video.addEventListener('error',()=>{if(video.error)status.textContent='Playback error ('+video.error.code+'). Check the stream URL/format.'});
      document.getElementById('retry').addEventListener('click',()=>{retryCount=0;start()});
      document.getElementById('pip').addEventListener('click',()=>{if(document.pictureInPictureEnabled&&video.requestPictureInPicture)video.requestPictureInPicture().catch(()=>status.textContent='Picture-in-picture is unavailable in this browser.')});
      window.addEventListener('beforeunload',()=>{if(hls)hls.destroy()}); start();
    </script></body></html>`)
    popup.document.close()
    popup.focus()
  }

  function togglePlayback() {
    const video = videoRef.current
    if (!selected?.url) { setShowImport(true); setNotice('Import a playlist to start watching.'); return }
    if (!video) return
    if (video.paused) video.play().then(() => setPlaying(true)).catch(() => setNotice('Playback was blocked or the stream is unavailable.'))
    else { video.pause(); setPlaying(false) }
  }
  function fullscreen() {
    const node = document.querySelector('.video-shell')
    if (node?.requestFullscreen) node.requestFullscreen()
    else if (videoRef.current?.webkitEnterFullscreen) videoRef.current.webkitEnterFullscreen()
  }
  const currentLabel = navItems.find(n => n.id === page)?.label || 'Home'

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand" onClick={() => { setPage('home'); setSidebarOpen(false) }} role="button" tabIndex="0">
          <div className="brand-mark"><Tv size={22} strokeWidth={2.5}/><span className="brand-dot"/></div>
          <div className="brand-name">MALLU TV <b>PRO</b><small>YOUR WORLD. YOUR TV.</small></div>
        </div>
        <div className="profile-chip"><div className="profile-avatar">M</div><div><strong>Welcome back</strong><span>Personal TV hub</span></div><ChevronDown size={15}/></div>
        <div className="nav-label">DISCOVER</div>
        <nav className="main-nav">
          {navItems.map(item => {
            const Icon = item.icon
            return <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => { setPage(item.id); setCategory('All channels'); setSidebarOpen(false) }}><Icon size={18}/><span>{item.label}</span>{item.id === 'favorites' && favorites.length > 0 && <em>{favorites.length}</em>}</button>
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="nav-label">YOUR LIBRARY</div>
          <button className="nav-item" onClick={() => setShowImport(true)}><ListVideo size={18}/><span>Playlist Manager</span></button>
          <button className="nav-item" onClick={() => setShowSettings(true)}><Settings size={18}/><span>Settings</span></button>
          <div className="upgrade-card"><div className="upgrade-orb">✦</div><strong>Your TV, your way.</strong><p>Add playlists to bring your channels together in one place.</p><button onClick={() => setShowImport(true)}>Add a playlist <ChevronRight size={15}/></button></div>
          <div className="sidebar-foot"><span className="status-dot"/> Player ready <span>v1.0</span></div>
        </div>
      </aside>

      {sidebarOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setSidebarOpen(false)}/>}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
          <div className="breadcrumb"><span>Discover</span><ChevronRight size={14}/><strong>{currentLabel}</strong></div>
          <div className="top-actions">
            <label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Channels, shows, sports..." aria-label="Search channels"/><kbd>⌘ K</kbd></label>
            <button className="icon-button globe-button" title="Global availability"><Globe2 size={19}/></button>
            <button className="user-button" title="Profile">M</button>
          </div>
        </header>

        {page === 'home' ? (
          <>
            <section className="hero">
              <div className="hero-art">
                <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
                <div className="hero-grid"/>
                <div className="hero-figure"><div className="figure-halo"/><div className="figure-head"/><div className="figure-body"/></div>
                <div className="hero-stamp">M<br/><small>PRO</small></div>
                <div className="hero-content">
                  <div className="eyebrow"><span className="live-pulse"/> YOUR ENTERTAINMENT, CONNECTED</div>
                  <h1>Every screen.<br/><span>One destination.</span></h1>
                  <p>Your personal home for live TV, sports, news and entertainment. Bring your playlists and watch your way.</p>
                  <div className="hero-actions"><button className="primary-button" onClick={() => { setPage('live'); setCategory('All channels') }}><Play size={17} fill="currentColor"/> Explore Live TV</button><button className="secondary-button" onClick={() => setShowImport(true)}><Plus size={17}/> Add playlist</button></div>
                  <div className="hero-proof"><span><CheckCircle2 size={14}/> M3U & M3U8</span><span><CheckCircle2 size={14}/> Multi-device</span><span><CheckCircle2 size={14}/> Your playlists</span></div>
                </div>
                <div className="hero-caption"><span className="caption-line"/> MALLU ORIGINAL EXPERIENCE <span className="caption-index">01 / 04</span></div>
              </div>
            </section>
            <section className="quick-stats">
              <div><span className="stat-icon blue"><Radio size={17}/></span><span><strong>{importedChannels.length}</strong><small>Imported channels</small></span></div>
              <div><span className="stat-icon violet"><ListVideo size={17}/></span><span><strong>{playlists.length}</strong><small>Playlists</small></span></div>
              <div><span className="stat-icon pink"><Heart size={17}/></span><span><strong>{favorites.length}</strong><small>Favorites</small></span></div>
              <div className="stats-note"><span className="status-dot"/> Your library is stored on this device</div>
            </section>
            <section className="section channel-pack-section">
              <div className="section-heading"><div><h2>Explore channel packs</h2><p>Add Hindi, Tamil, English, movies, cartoons and sports without changing your Malayalam list.</p></div><span className="section-count">PUBLIC PLAYLISTS</span></div>
              <div className="channel-pack-grid">{publicChannelPacks.map(pack => { const Icon = pack.icon; const added = playlists.some(p => p.source === pack.url); return <article className="channel-pack-card" key={pack.id}><div className="channel-pack-icon" style={{background:pack.color}}><Icon size={21}/></div><div className="channel-pack-copy"><strong>{pack.name}</strong><span>{pack.description}</span></div><button className={added ? 'channel-pack-added' : ''} onClick={() => addChannelPack(pack)}>{added ? 'Added' : 'Add pack'}{added ? <CheckCircle2 size={14}/> : <Plus size={14}/>}</button></article> })}</div>
              <p className="channel-pack-note"><Info size={14}/> Public playlists can change. Channels may be geo-restricted, offline, or blocked by their source; this app does not bypass DRM or provider access controls.</p>
            </section>
            <ChannelSection title="Jump into live TV" subtitle="Your channels, all in one place" channels={allChannels.slice(0, 8)} onSelect={selectChannel} selected={selected} favorites={favorites} onFavorite={toggleFavorite}/>
            <ChannelSection title="Explore by mood" subtitle="Find something worth watching" categories={true} onCategory={g => { setCategory(g); setPage('live') }} groups={channelGroups}/>
          </>
        ) : (
          <section className="content-page">
            <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> MALLU TV PRO</div><h1>{currentLabel}</h1><p>{page === 'live' ? 'Browse your imported channels and tune in.' : page === 'favorites' ? 'Your saved channels in one place.' : page === 'recent' ? 'Pick up where you left off.' : 'Explore channels from your personal library.'}</p></div><button className="primary-button compact" onClick={() => setShowImport(true)}><Plus size={16}/> Add playlist</button></div>
            {page === 'live' && <div className="category-tabs">{channelGroups.map(g => <button key={g} className={category === g ? 'selected' : ''} onClick={() => setCategory(g)}>{g}</button>)}</div>}
            {page === 'live' && <div className="live-layout">
              <div className="player-column">
                <div className="video-shell">
                  <video ref={videoRef} playsInline controls={false} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onVolumeChange={e => { setMuted(e.target.muted); setVolume(e.target.volume) }}/>
                  {!selected?.url && <div className="player-empty"><div className="empty-tv"><Tv size={33}/><span className="empty-signal"/></div><span className="live-badge"><i/> LIVE PLAYER</span><h2>Ready when you are.</h2><p>Choose a channel with a stream URL, or import your M3U/M3U8 playlist.</p><button className="primary-button" onClick={() => setShowImport(true)}><Plus size={16}/> Import channels</button></div>}
                  {selected?.url && <div className="video-overlay-top"><span className="live-badge"><i/> LIVE</span><span className="quality-badge">{quality === 'Auto' ? 'AUTO' : quality}</span></div>}
                  <div className="player-controls"><button onClick={togglePlayback} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}</button><button onClick={() => setMuted(!muted)} aria-label="Toggle mute">{muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button><input aria-label="Volume" type="range" min="0" max="1" step=".05" value={muted ? 0 : volume} onChange={e => { setVolume(Number(e.target.value)); setMuted(false) }}/><div className="control-spacer"/><select aria-label="Quality preference" value={quality} onChange={e => setQuality(e.target.value)}><option>Auto</option><option>1080p</option><option>720p</option><option>480p</option></select><button onClick={openPopupPlayer} aria-label="Open pop-up player" title="Open pop-up player"><ExternalLink size={17}/></button><button onClick={fullscreen} aria-label="Fullscreen" title="Fullscreen"><Maximize size={18}/></button></div>
                </div>
                <div className="now-playing"><div className="channel-logo large" style={{background:selected.color}}>{selected.logo && selected.logo.length < 3 ? selected.logo : <Tv size={21}/>}</div><div className="now-title"><span>NOW PLAYING</span><h2>{selected.name}</h2><p>{selected.group} <b>·</b> {selected.country || 'Global'}</p></div><button className={`round-action ${favorites.includes(selected.id) ? 'favorited' : ''}`} onClick={() => toggleFavorite(selected)} title="Toggle favorite"><Heart size={18} fill={favorites.includes(selected.id) ? 'currentColor' : 'none'}/></button></div>
                {notice && <div className="notice"><Info size={16}/><span>{notice}</span><button onClick={() => setNotice('')}><X size={15}/></button></div>}
              </div>
              <aside className="channel-panel"><div className="panel-heading"><div><h3>Channel list</h3><p>{filteredChannels.length} channels available</p></div><button className="icon-button small" onClick={() => setShowImport(true)} title="Add playlist"><Plus size={17}/></button></div><div className="channel-list">{filteredChannels.slice(0, channelListLimit).map((c,i) => <ChannelRow key={c.id} channel={c} active={selected.id === c.id} favorite={favorites.includes(c.id)} onClick={() => selectChannel(c)} onFavorite={() => toggleFavorite(c)} index={i}/>)}</div>{filteredChannels.length > channelListLimit && <button className="load-more-channels" onClick={() => setChannelListLimit(n => Math.min(n + 300, filteredChannels.length))}>Load more channels ({filteredChannels.length - channelListLimit} remaining)</button>}</aside>
            </div>}
            {page !== 'live' && <ChannelSection title={filteredChannels.length ? `${filteredChannels.length} channels` : 'Nothing here yet'} subtitle={filteredChannels.length ? 'Select a channel to open it in the player.' : 'Import a playlist or save a channel as a favorite to see it here.'} channels={filteredChannels} onSelect={c => { selectChannel(c); setPage('live') }} selected={selected} favorites={favorites} onFavorite={toggleFavorite} emptyAction={() => setShowImport(true)}/>}
            {page === 'live' && <div className="epg-section"><button className="epg-toggle" onClick={() => setGuideOpen(!guideOpen)}><div><Clock3 size={17}/><strong>TV Guide</strong><span>Program information</span></div>{guideOpen ? <ChevronDown size={17}/> : <ChevronRight size={17}/>}</button>{guideOpen && <div className="epg-empty"><div className="epg-clock"><Clock3 size={22}/></div><div><strong>Your guide will appear here</strong><p>EPG data can be connected when your playlist or provider supplies compatible XMLTV guide information.</p></div><button className="text-button" onClick={() => setShowImport(true)}>Manage playlists <ChevronRight size={14}/></button></div>}</div>}
            {page === 'live' && <ChannelSection title="More to explore" subtitle="Keep browsing your library" channels={filteredChannels.filter(c => c.id !== selected.id).slice(0,6)} onSelect={selectChannel} selected={selected} favorites={favorites} onFavorite={toggleFavorite}/>}
          </section>
        )}

        <footer className="footer"><div className="footer-brand"><div className="brand-mark tiny"><Tv size={14}/></div><strong>MALLU TV PRO</strong></div><span>One place for your personal TV library.</span><div><button onClick={() => setShowSettings(true)}>Settings</button><button onClick={() => setShowImport(true)}>Playlists</button><span>© {new Date().getFullYear()} MALLU TV PRO</span></div></footer>
      </main>

      {showImport && <div className="modal-backdrop" onMouseDown={e => { if(e.target === e.currentTarget) { setShowImport(false); setImportError('') } }}><div className="modal">
        <div className="modal-top"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR LIBRARY</div><h2>Add a playlist</h2><p>Bring your compatible M3U/M3U8 channels into MALLU TV PRO.</p></div><button className="icon-button" onClick={() => { setShowImport(false); setImportError('') }} aria-label="Close"><X size={20}/></button></div>
        <div className="modal-tabs"><button className={importTab === 'url' ? 'active' : ''} onClick={() => {setImportTab('url');setImportError('')}}><Link2 size={16}/> Playlist URL</button><button className={importTab === 'file' ? 'active' : ''} onClick={() => {setImportTab('file');setImportError('')}}><Upload size={16}/> Upload file</button></div>
        <label className="field-label">Playlist name <span>OPTIONAL</span></label><input className="text-input" value={playlistName} onChange={e => setPlaylistName(e.target.value)} placeholder="e.g. My Malayalam channels"/>
        {importTab === 'url' ? <><label className="field-label">M3U / M3U8 URL</label><input className="text-input" value={playlistUrl} onChange={e => setPlaylistUrl(e.target.value)} placeholder="https://example.com/playlist.m3u" onKeyDown={e => e.key === 'Enter' && addPlaylistFromUrl()}/><p className="field-help"><Info size={14}/> Some playlist hosts block browser access (CORS). If a URL fails, upload the playlist file instead.</p><button className="primary-button modal-submit" onClick={addPlaylistFromUrl}><Plus size={16}/> Import playlist</button></> : <><div className="upload-drop" onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => {e.preventDefault();importFile(e.dataTransfer.files?.[0])}}><div className="upload-icon"><Upload size={23}/></div><strong>Choose a playlist file</strong><span>Drop a file here or browse your device</span><small>Supported formats: .m3u, .m3u8, .txt</small><input ref={fileRef} type="file" accept=".m3u,.m3u8,.txt,text/plain,application/vnd.apple.mpegurl" hidden onChange={e => importFile(e.target.files?.[0])}/></div><button className="secondary-button full-width" onClick={() => fileRef.current?.click()}>Browse files</button></>}
        {importError && <div className="error-box"><AlertCircle size={16}/><span>{importError}</span></div>}
        <div className="modal-footnote"><CheckCircle2 size={14}/> Playlists are stored in this browser. Only add sources you are authorized to access.</div>
      </div></div>}

      {showSettings && <div className="modal-backdrop" onMouseDown={e => {if(e.target===e.currentTarget)setShowSettings(false)}}><div className="modal settings-modal"><div className="modal-top"><div><div className="eyebrow"><span className="eyebrow-line"/> PREFERENCES</div><h2>Settings</h2><p>Manage your MALLU TV PRO experience.</p></div><button className="icon-button" onClick={() => setShowSettings(false)}><X size={20}/></button></div><div className="settings-row"><div className="settings-icon"><MonitorPlay size={18}/></div><div><strong>Playback quality</strong><p>Set the preferred quality in the Live TV player.</p></div><span className="settings-value">{quality}</span></div><div className="settings-row"><div className="settings-icon"><Globe2 size={18}/></div><div><strong>Language & region</strong><p>Channel availability depends on the source and its terms.</p></div><span className="settings-value">Auto</span></div><div className="settings-row"><div className="settings-icon"><ListVideo size={18}/></div><div><strong>Playlist library</strong><p>{playlists.length} playlists · {importedChannels.length} imported channels</p></div><button className="text-button" onClick={() => {setShowSettings(false);setShowImport(true)}}>Manage <ChevronRight size={14}/></button></div><div className="playlist-manager"><div className="panel-heading"><div><h3>Your playlists</h3><p>Remove imported lists from this browser.</p></div></div>{playlists.length ? playlists.map(p => <div className="playlist-item" key={p.id}><div className="playlist-icon"><ListVideo size={17}/></div><div><strong>{p.name}</strong><span>{p.channels.length} channels · {p.source === 'local file' ? 'Local file' : 'URL'}</span></div><button className="icon-button danger" onClick={() => removePlaylist(p.id)} title={`Remove ${p.name}`}><Trash2 size={16}/></button></div>) : <div className="no-playlists">No playlists added yet.</div>}</div><button className="primary-button modal-submit" onClick={() => {setShowSettings(false);setShowImport(true)}}><Plus size={16}/> Add playlist</button></div></div>}

      {notice && page !== 'live' && <button className="toast" onClick={() => setNotice('')}><Info size={16}/>{notice}<X size={15}/></button>}
    </div>
  )
}

function ChannelSection({title,subtitle,channels=[],onSelect,selected,favorites=[],onFavorite,categories=false,groups=[],onCategory,emptyAction}) {
  if (categories) return <section className="section"><div className="section-heading"><div><h2>{title}</h2><p>{subtitle}</p></div></div><div className="category-grid">{groups.filter(g=>g!=='All channels').slice(0,8).map((g,i)=><button key={g} className={`category-card category-${i%6}`} onClick={()=>onCategory?.(g)}><div className="category-symbol">{[<Radio/>,<Film/>,<Trophy/>,<Newspaper/>,<Globe2/>,<Tv/>][i%6]}</div><div><strong>{g}</strong><span>Explore channels</span></div><ChevronRight size={17}/></button>)}</div></section>
  return <section className="section"><div className="section-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{channels.length > 0 && <span className="section-count">{channels.length} ITEMS <ChevronRight size={14}/></span>}</div>{channels.length ? <div className="channel-cards">{channels.map((c,i)=><article className={`channel-card ${selected?.id===c.id?'is-selected':''}`} key={c.id} style={{'--card-index':i}}><button className="card-main" onClick={()=>onSelect?.(c)}><div className="card-art" style={{background:c.color || 'linear-gradient(135deg,#1d4ed8,#7c3aed)'}}>{c.logo && c.logo.length < 3 ? <span className="card-logo-text">{c.logo}</span> : <Tv size={29}/>}<span className="card-live"><i/> {c.url ? 'READY' : 'ADD SOURCE'}</span><div className="card-play"><Play size={19} fill="currentColor"/></div></div><div className="card-info"><strong title={c.name}>{c.name}</strong><span>{c.group || 'Other'} <b>·</b> {c.country || 'Global'}</span></div></button><button className={`card-heart ${favorites.includes(c.id)?'favorited':''}`} onClick={()=>onFavorite?.(c)} aria-label="Toggle favorite"><Heart size={16} fill={favorites.includes(c.id)?'currentColor':'none'}/></button></article>)}</div> : <div className="empty-library"><div className="empty-icon"><Tv size={24}/></div><h3>Your screen is waiting</h3><p>Import an M3U/M3U8 playlist to fill your library with channels.</p><button className="secondary-button" onClick={emptyAction}><Plus size={15}/> Add playlist</button></div>}</section>
}

function ChannelRow({channel,active,favorite,onClick,onFavorite,index}) {
  return <div className={`channel-row ${active?'active':''}`}><button className="channel-row-main" onClick={onClick}><span className="row-number">{String(index+1).padStart(2,'0')}</span><span className="channel-logo" style={{background:channel.color || 'linear-gradient(135deg,#1d4ed8,#7c3aed)'}}>{channel.logo && channel.logo.length < 3 ? channel.logo : <Tv size={17}/>}</span><span className="row-copy"><strong>{channel.name}</strong><small>{channel.group || 'Other'}</small></span><span className={`row-state ${channel.url?'ready':''}`}>{channel.url ? <span/> : '—'}</span></button><button className={`row-heart ${favorite?'favorited':''}`} onClick={onFavorite} aria-label="Toggle favorite"><Heart size={14} fill={favorite?'currentColor':'none'}/></button></div>
}