!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vue-flat-surface-shader",[],e):"object"==typeof exports?exports["vue-flat-surface-shader"]=e():t["vue-flat-surface-shader"]=e()}(this,function(){return function(t){function e(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,i){function r(t){i(8)}var n=i(6)(i(1),i(7),r,null,null);t.exports=n.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(5),n=i.n(r),s=function(t){throw new Error("[vue-flat-surface-shader]: "+t)};e.default={name:"flat-surface-shader",props:{type:{type:String,default:"svg"},mesh:{type:Object,default:function(){return{}}},light:{type:Object,default:function(){return{}}}},mounted:function(){this.initialize()},data:function(){return{start:Date.now(),scene:new n.a.Scene,renderer:null,meshIns:null,MESH:{width:1.2,height:1.2,depth:10,segments:16,slices:8,xRange:.8,yRange:.1,zRange:1,ambient:"#555555",diffuse:"#FFFFFF",speed:.002},LIGHT:{count:2,xyScalar:1,zOffset:100,ambient:"#880066",diffuse:"#FF8800",speed:.001,gravity:1200,dampening:.95,minLimit:10,maxLimit:null,minDistance:20,maxDistance:400,autopilot:!1,draw:!0,bounds:n.a.Vector3.create(),step:n.a.Vector3.create(Math.randomInRange(.2,1),Math.randomInRange(.2,1),Math.randomInRange(.2,1))},geometry:new n.a.Plane,material:new n.a.Material,center:n.a.Vector3.create(),attractor:n.a.Vector3.create(),svgRenderer:new n.a.SVGRenderer,canvasRenderer:new n.a.CanvasRenderer,webglRenderer:new n.a.WebGLRenderer}},methods:{initialize:function(){var t=this.$refs.shader;this.setRenderer(),this.scene=new n.a.Scene,this.createMesh(),this.createLights(),this.addEventListeners(),this.resize(t.offsetWidth,t.offsetHeight),this.animate()},setRenderer:function(){var t=this.$refs.shader;switch(this.renderer&&t.removeChild(this.renderer.element),this.type){case"webgl":this.renderer=this.webglRenderer;break;case"canvas":this.renderer=this.canvasRenderer;break;case"svg":this.renderer=this.svgRenderer;break;default:s("Invalid renderer type - "+this.type)}this.renderer.setSize(t.offsetWidth,t.offsetHeight),t.appendChild(this.renderer.element)},createMesh:function(){this.MESH=Object.assign(this.MESH,this.mesh),this.scene.remove(this.meshIns),this.renderer.clear();var t=this.MESH;this.geometry=new n.a.Plane(t.width*this.renderer.width,t.height*this.renderer.height,t.segments,t.slices),this.material=new n.a.Material(t.ambient,t.diffuse),this.meshIns=new n.a.Mesh(this.geometry,this.material),this.scene.add(this.meshIns);for(var e=this.geometry.vertices.length-1;e>=0;e--){var i=this.geometry.vertices[e];i.anchor=n.a.Vector3.clone(i.position),i.step=n.a.Vector3.create(Math.randomInRange(.2,1),Math.randomInRange(.2,1),Math.randomInRange(.2,1)),i.time=Math.randomInRange(0,Math.PIM2)}},createLights:function(){this.LIGHT=Object.assign(this.LIGHT,this.light);for(var t=this.scene.lights.length-1;t>=0;t--){var e=this.scene.lights[t];this.scene.remove(e)}this.renderer.clear();for(var i=0;i<this.LIGHT.count;i++){var r=new n.a.Light(this.LIGHT.ambient,this.LIGHT.diffuse);r.ambientHex=r.ambient.format(),r.diffuseHex=r.diffuse.format(),this.scene.add(r),r.mass=Math.randomInRange(.5,1),r.velocity=n.a.Vector3.create(),r.acceleration=n.a.Vector3.create(),r.force=n.a.Vector3.create(),r.ring=document.createElementNS(n.a.SVGNS,"circle"),r.ring.setAttributeNS(null,"stroke",r.ambientHex),r.ring.setAttributeNS(null,"stroke-width","0.5"),r.ring.setAttributeNS(null,"fill","none"),r.ring.setAttributeNS(null,"r","10"),r.core=document.createElementNS(n.a.SVGNS,"circle"),r.core.setAttributeNS(null,"fill",r.diffuseHex),r.core.setAttributeNS(null,"r","4")}},resize:function(t,e){this.renderer.setSize(t,e),n.a.Vector3.set(this.center,this.renderer.halfWidth,this.renderer.halfHeight),this.createMesh()},animate:function(){this.update(),this.shaderRender(),requestAnimationFrame(this.animate)},update:function(){this.MESH=Object.assign(this.MESH,this.mesh),this.LIGHT=Object.assign(this.LIGHT,this.light);var t=Date.now()-this.start,e=void 0,i=void 0,r=void 0,s=this.MESH.depth/2;n.a.Vector3.copy(this.LIGHT.bounds,this.center),n.a.Vector3.multiplyScalar(this.LIGHT.bounds,this.LIGHT.xyScalar),n.a.Vector3.setZ(this.attractor,this.LIGHT.zOffset),this.LIGHT.autopilot&&(e=Math.sin(this.LIGHT.step[0]*t*this.LIGHT.speed),i=Math.cos(this.LIGHT.step[1]*t*this.LIGHT.speed),n.a.Vector3.set(this.attractor,this.LIGHT.bounds[0]*e,this.LIGHT.bounds[1]*i,this.LIGHT.zOffset));for(var o=this.scene.lights.length-1;o>=0;o--){var a=this.scene.lights[o];n.a.Vector3.setZ(a.position,this.LIGHT.zOffset);var h=Math.clamp(n.a.Vector3.distanceSquared(a.position,this.attractor),this.LIGHT.minDistance,this.LIGHT.maxDistance),c=this.LIGHT.gravity*a.mass/h;n.a.Vector3.subtractVectors(a.force,this.attractor,a.position),n.a.Vector3.normalise(a.force),n.a.Vector3.multiplyScalar(a.force,c),n.a.Vector3.set(a.acceleration),n.a.Vector3.add(a.acceleration,a.force),n.a.Vector3.add(a.velocity,a.acceleration),n.a.Vector3.multiplyScalar(a.velocity,this.LIGHT.dampening),n.a.Vector3.limit(a.velocity,this.LIGHT.minLimit,this.LIGHT.maxLimit),n.a.Vector3.add(a.position,a.velocity)}for(var l=this.geometry.vertices.length-1;l>=0;l--){var u=this.geometry.vertices[l];e=Math.sin(u.time+u.step[0]*t*this.MESH.speed),i=Math.cos(u.time+u.step[1]*t*this.MESH.speed),r=Math.sin(u.time+u.step[2]*t*this.MESH.speed),n.a.Vector3.set(u.position,this.MESH.xRange*this.geometry.segmentWidth*e,this.MESH.yRange*this.geometry.sliceHeight*i,this.MESH.zRange*s*r-s),n.a.Vector3.add(u.position,u.anchor)}this.geometry.dirty=!0},shaderRender:function(){if(this.MESH=Object.assign(this.MESH,this.mesh),this.LIGHT=Object.assign(this.LIGHT,this.light),this.renderer.render(this.scene),this.LIGHT.draw)for(var t=this.scene.lights.length-1;t>=0;t--){var e=this.scene.lights[t],i=e.position[0],r=e.position[1];switch(this.type){case"canvas":this.renderer.context.lineWidth=.5,this.renderer.context.beginPath(),this.renderer.context.arc(i,r,10,0,Math.PIM2),this.renderer.context.strokeStyle=e.ambientHex,this.renderer.context.stroke(),this.renderer.context.beginPath(),this.renderer.context.arc(i,r,4,0,Math.PIM2),this.renderer.context.fillStyle=e.diffuseHex,this.renderer.context.fill();break;case"svg":i+=this.renderer.halfWidth,r=this.renderer.halfHeight-r,e.core.setAttributeNS(null,"fill",e.diffuseHex),e.core.setAttributeNS(null,"cx",i),e.core.setAttributeNS(null,"cy",r),this.renderer.element.appendChild(e.core),e.ring.setAttributeNS(null,"stroke",e.ambientHex),e.ring.setAttributeNS(null,"cx",i),e.ring.setAttributeNS(null,"cy",r),this.renderer.element.appendChild(e.ring)}}},addEventListeners:function(){var t=this.$refs.shader;window.addEventListener("resize",this.onWindowResize),t.addEventListener("mousemove",this.onMouseMove)},onWindowResize:function(t){var e=this.$refs.shader;this.resize(e.offsetWidth,e.offsetHeight),this.shaderRender()},onMouseMove:function(t){n.a.Vector3.set(this.attractor,t.x,this.renderer.height-t.y),n.a.Vector3.subtract(this.attractor,this.center)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(0),n=i.n(r);i.d(e,"FlatSurfaceShader",function(){return n.a});var s=function(t){t.component("flat-surface-shader",n.a)};e.default={install:s}},function(t,e,i){e=t.exports=i(4)(),e.push([t.i,"",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},n=0;n<this.length;n++){var s=this[n][0];"number"==typeof s&&(r[s]=!0)}for(n=0;n<e.length;n++){var o=e[n];"number"==typeof o[0]&&r[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(t,e){FSS={FRONT:0,BACK:1,DOUBLE:2,SVGNS:"http://www.w3.org/2000/svg"},FSS.Array="function"==typeof Float32Array?Float32Array:Array,FSS.Utils={isNumber:function(t){return!isNaN(parseFloat(t))&&isFinite(t)}},function(){for(var t=0,e=["ms","moz","webkit","o"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,i){var r=(new Date).getTime(),n=Math.max(0,16-(r-t)),s=window.setTimeout(function(){e(r+n)},n);return t=r+n,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),Math.PIM2=2*Math.PI,Math.PID2=Math.PI/2,Math.randomInRange=function(t,e){return t+(e-t)*Math.random()},Math.clamp=function(t,e,i){return t=Math.max(t,e),t=Math.min(t,i)},FSS.Vector3={create:function(t,e,i){var r=new FSS.Array(3);return this.set(r,t,e,i),r},clone:function(t){var e=this.create();return this.copy(e,t),e},set:function(t,e,i,r){return t[0]=e||0,t[1]=i||0,t[2]=r||0,this},setX:function(t,e){return t[0]=e||0,this},setY:function(t,e){return t[1]=e||0,this},setZ:function(t,e){return t[2]=e||0,this},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],this},add:function(t,e){return t[0]+=e[0],t[1]+=e[1],t[2]+=e[2],this},addVectors:function(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],this},addScalar:function(t,e){return t[0]+=e,t[1]+=e,t[2]+=e,this},subtract:function(t,e){return t[0]-=e[0],t[1]-=e[1],t[2]-=e[2],this},subtractVectors:function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],this},subtractScalar:function(t,e){return t[0]-=e,t[1]-=e,t[2]-=e,this},multiply:function(t,e){return t[0]*=e[0],t[1]*=e[1],t[2]*=e[2],this},multiplyVectors:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t[2]=e[2]*i[2],this},multiplyScalar:function(t,e){return t[0]*=e,t[1]*=e,t[2]*=e,this},divide:function(t,e){return t[0]/=e[0],t[1]/=e[1],t[2]/=e[2],this},divideVectors:function(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t[2]=e[2]/i[2],this},divideScalar:function(t,e){return 0!==e?(t[0]/=e,t[1]/=e,t[2]/=e):(t[0]=0,t[1]=0,t[2]=0),this},cross:function(t,e){var i=t[0],r=t[1],n=t[2];return t[0]=r*e[2]-n*e[1],t[1]=n*e[0]-i*e[2],t[2]=i*e[1]-r*e[0],this},crossVectors:function(t,e,i){return t[0]=e[1]*i[2]-e[2]*i[1],t[1]=e[2]*i[0]-e[0]*i[2],t[2]=e[0]*i[1]-e[1]*i[0],this},min:function(t,e){return t[0]<e&&(t[0]=e),t[1]<e&&(t[1]=e),t[2]<e&&(t[2]=e),this},max:function(t,e){return t[0]>e&&(t[0]=e),t[1]>e&&(t[1]=e),t[2]>e&&(t[2]=e),this},clamp:function(t,e,i){return this.min(t,e),this.max(t,i),this},limit:function(t,e,i){var r=this.length(t);return null!==e&&r<e?this.setLength(t,e):null!==i&&r>i&&this.setLength(t,i),this},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]},normalise:function(t){return this.divideScalar(t,this.length(t))},negate:function(t){return this.multiplyScalar(t,-1)},distanceSquared:function(t,e){var i=t[0]-e[0],r=t[1]-e[1],n=t[2]-e[2];return i*i+r*r+n*n},distance:function(t,e){return Math.sqrt(this.distanceSquared(t,e))},lengthSquared:function(t){return t[0]*t[0]+t[1]*t[1]+t[2]*t[2]},length:function(t){return Math.sqrt(this.lengthSquared(t))},setLength:function(t,e){var i=this.length(t);return 0!==i&&e!==i&&this.multiplyScalar(t,e/i),this}},FSS.Vector4={create:function(t,e,i,r){var n=new FSS.Array(4);return this.set(n,t,e,i),n},set:function(t,e,i,r,n){return t[0]=e||0,t[1]=i||0,t[2]=r||0,t[3]=n||0,this},setX:function(t,e){return t[0]=e||0,this},setY:function(t,e){return t[1]=e||0,this},setZ:function(t,e){return t[2]=e||0,this},setW:function(t,e){return t[3]=e||0,this},add:function(t,e){return t[0]+=e[0],t[1]+=e[1],t[2]+=e[2],t[3]+=e[3],this},multiplyVectors:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t[2]=e[2]*i[2],t[3]=e[3]*i[3],this},multiplyScalar:function(t,e){return t[0]*=e,t[1]*=e,t[2]*=e,t[3]*=e,this},min:function(t,e){return t[0]<e&&(t[0]=e),t[1]<e&&(t[1]=e),t[2]<e&&(t[2]=e),t[3]<e&&(t[3]=e),this},max:function(t,e){return t[0]>e&&(t[0]=e),t[1]>e&&(t[1]=e),t[2]>e&&(t[2]=e),t[3]>e&&(t[3]=e),this},clamp:function(t,e,i){return this.min(t,e),this.max(t,i),this}},FSS.Color=function(t,e){this.rgba=FSS.Vector4.create(),this.hex=t||"#000000",this.opacity=FSS.Utils.isNumber(e)?e:1,this.set(this.hex,this.opacity)},FSS.Color.prototype={set:function(t,e){t=t.replace("#","");var i=t.length/3;return this.rgba[0]=parseInt(t.substring(0*i,1*i),16)/255,this.rgba[1]=parseInt(t.substring(1*i,2*i),16)/255,this.rgba[2]=parseInt(t.substring(2*i,3*i),16)/255,this.rgba[3]=FSS.Utils.isNumber(e)?e:this.rgba[3],this},hexify:function(t){var e=Math.ceil(255*t).toString(16);return 1===e.length&&(e="0"+e),e},format:function(){var t=this.hexify(this.rgba[0]),e=this.hexify(this.rgba[1]),i=this.hexify(this.rgba[2]);return this.hex="#"+t+e+i,this.hex}},FSS.Object=function(){this.position=FSS.Vector3.create()},FSS.Object.prototype={setPosition:function(t,e,i){return FSS.Vector3.set(this.position,t,e,i),this}},FSS.Light=function(t,e){FSS.Object.call(this),this.ambient=new FSS.Color(t||"#FFFFFF"),this.diffuse=new FSS.Color(e||"#FFFFFF"),this.ray=FSS.Vector3.create()},FSS.Light.prototype=Object.create(FSS.Object.prototype),FSS.Vertex=function(t,e,i){this.position=FSS.Vector3.create(t,e,i)},FSS.Vertex.prototype={setPosition:function(t,e,i){return FSS.Vector3.set(this.position,t,e,i),this}},FSS.Triangle=function(t,e,i){this.a=t||new FSS.Vertex,this.b=e||new FSS.Vertex,this.c=i||new FSS.Vertex,this.vertices=[this.a,this.b,this.c],this.u=FSS.Vector3.create(),this.v=FSS.Vector3.create(),this.centroid=FSS.Vector3.create(),this.normal=FSS.Vector3.create(),this.color=new FSS.Color,this.polygon=document.createElementNS(FSS.SVGNS,"polygon"),this.polygon.setAttributeNS(null,"stroke-linejoin","round"),this.polygon.setAttributeNS(null,"stroke-miterlimit","1"),this.polygon.setAttributeNS(null,"stroke-width","1"),this.computeCentroid(),this.computeNormal()},FSS.Triangle.prototype={computeCentroid:function(){return this.centroid[0]=this.a.position[0]+this.b.position[0]+this.c.position[0],this.centroid[1]=this.a.position[1]+this.b.position[1]+this.c.position[1],this.centroid[2]=this.a.position[2]+this.b.position[2]+this.c.position[2],FSS.Vector3.divideScalar(this.centroid,3),this},computeNormal:function(){return FSS.Vector3.subtractVectors(this.u,this.b.position,this.a.position),FSS.Vector3.subtractVectors(this.v,this.c.position,this.a.position),FSS.Vector3.crossVectors(this.normal,this.u,this.v),FSS.Vector3.normalise(this.normal),this}},FSS.Geometry=function(){this.vertices=[],this.triangles=[],this.dirty=!1},FSS.Geometry.prototype={update:function(){if(this.dirty){var t,e;for(t=this.triangles.length-1;t>=0;t--)e=this.triangles[t],e.computeCentroid(),e.computeNormal();this.dirty=!1}return this}},FSS.Plane=function(t,e,i,r){FSS.Geometry.call(this),this.width=t||100,this.height=e||100,this.segments=i||4,this.slices=r||4,this.segmentWidth=this.width/this.segments,this.sliceHeight=this.height/this.slices;var n,s,o,a,h,c,l,u=[],f=-.5*this.width,d=.5*this.height;for(n=0;n<=this.segments;n++)for(u.push([]),s=0;s<=this.slices;s++)l=new FSS.Vertex(f+n*this.segmentWidth,d-s*this.sliceHeight),u[n].push(l),this.vertices.push(l);for(n=0;n<this.segments;n++)for(s=0;s<this.slices;s++)o=u[n+0][s+0],a=u[n+0][s+1],h=u[n+1][s+0],c=u[n+1][s+1],t0=new FSS.Triangle(o,a,h),t1=new FSS.Triangle(h,a,c),this.triangles.push(t0,t1)},FSS.Plane.prototype=Object.create(FSS.Geometry.prototype),FSS.Material=function(t,e){this.ambient=new FSS.Color(t||"#444444"),this.diffuse=new FSS.Color(e||"#FFFFFF"),this.slave=new FSS.Color},FSS.Mesh=function(t,e){FSS.Object.call(this),this.geometry=t||new FSS.Geometry,this.material=e||new FSS.Material,this.side=FSS.FRONT,this.visible=!0},FSS.Mesh.prototype=Object.create(FSS.Object.prototype),FSS.Mesh.prototype.update=function(t,e){var i,r,n,s,o;if(this.geometry.update(),e)for(i=this.geometry.triangles.length-1;i>=0;i--){for(r=this.geometry.triangles[i],FSS.Vector4.set(r.color.rgba),n=t.length-1;n>=0;n--)s=t[n],FSS.Vector3.subtractVectors(s.ray,s.position,r.centroid),FSS.Vector3.normalise(s.ray),o=FSS.Vector3.dot(r.normal,s.ray),this.side===FSS.FRONT?o=Math.max(o,0):this.side===FSS.BACK?o=Math.abs(Math.min(o,0)):this.side===FSS.DOUBLE&&(o=Math.max(Math.abs(o),0)),FSS.Vector4.multiplyVectors(this.material.slave.rgba,this.material.ambient.rgba,s.ambient.rgba),FSS.Vector4.add(r.color.rgba,this.material.slave.rgba),FSS.Vector4.multiplyVectors(this.material.slave.rgba,this.material.diffuse.rgba,s.diffuse.rgba),FSS.Vector4.multiplyScalar(this.material.slave.rgba,o),FSS.Vector4.add(r.color.rgba,this.material.slave.rgba);FSS.Vector4.clamp(r.color.rgba,0,1)}return this},FSS.Scene=function(){this.meshes=[],this.lights=[]},FSS.Scene.prototype={add:function(t){return t instanceof FSS.Mesh&&!~this.meshes.indexOf(t)?this.meshes.push(t):t instanceof FSS.Light&&!~this.lights.indexOf(t)&&this.lights.push(t),this},remove:function(t){return t instanceof FSS.Mesh&&~this.meshes.indexOf(t)?this.meshes.splice(this.meshes.indexOf(t),1):t instanceof FSS.Light&&~this.lights.indexOf(t)&&this.lights.splice(this.lights.indexOf(t),1),this}},FSS.Renderer=function(){this.width=0,this.height=0,this.halfWidth=0,this.halfHeight=0},FSS.Renderer.prototype={setSize:function(t,e){if(this.width!==t||this.height!==e)return this.width=t,this.height=e,this.halfWidth=.5*this.width,this.halfHeight=.5*this.height,this},clear:function(){return this},render:function(t){return this}},FSS.CanvasRenderer=function(){FSS.Renderer.call(this),this.element=document.createElement("canvas"),this.element.style.display="block",this.context=this.element.getContext("2d"),this.setSize(this.element.width,this.element.height)},FSS.CanvasRenderer.prototype=Object.create(FSS.Renderer.prototype),FSS.CanvasRenderer.prototype.setSize=function(t,e){return FSS.Renderer.prototype.setSize.call(this,t,e),this.element.width=t,this.element.height=e,this.context.setTransform(1,0,0,-1,this.halfWidth,this.halfHeight),this},FSS.CanvasRenderer.prototype.clear=function(){return FSS.Renderer.prototype.clear.call(this),this.context.clearRect(-this.halfWidth,-this.halfHeight,this.width,this.height),this},FSS.CanvasRenderer.prototype.render=function(t){FSS.Renderer.prototype.render.call(this,t);var e,i,r,n,s;for(this.clear(),this.context.lineJoin="round",this.context.lineWidth=1,e=t.meshes.length-1;e>=0;e--)if(i=t.meshes[e],i.visible)for(i.update(t.lights,!0),r=i.geometry.triangles.length-1;r>=0;r--)n=i.geometry.triangles[r],s=n.color.format(),this.context.beginPath(),this.context.moveTo(n.a.position[0],n.a.position[1]),this.context.lineTo(n.b.position[0],n.b.position[1]),this.context.lineTo(n.c.position[0],n.c.position[1]),this.context.closePath(),this.context.strokeStyle=s,this.context.fillStyle=s,this.context.stroke(),this.context.fill();return this},FSS.WebGLRenderer=function(){FSS.Renderer.call(this),this.element=document.createElement("canvas"),this.element.style.display="block",this.vertices=null,this.lights=null;var t={preserveDrawingBuffer:!1,premultipliedAlpha:!0,antialias:!0,stencil:!0,alpha:!0};if(this.gl=this.getContext(this.element,t),this.unsupported=!this.gl,this.unsupported)return"WebGL is not supported by your browser.";this.gl.clearColor(0,0,0,0),this.gl.enable(this.gl.DEPTH_TEST),this.setSize(this.element.width,this.element.height)},FSS.WebGLRenderer.prototype=Object.create(FSS.Renderer.prototype),FSS.WebGLRenderer.prototype.getContext=function(t,e){var i=!1;try{if(!(i=t.getContext("experimental-webgl",e)))throw"Error creating WebGL context."}catch(t){console.error(t)}return i},FSS.WebGLRenderer.prototype.setSize=function(t,e){if(FSS.Renderer.prototype.setSize.call(this,t,e),!this.unsupported)return this.element.width=t,this.element.height=e,this.gl.viewport(0,0,t,e),this},FSS.WebGLRenderer.prototype.clear=function(){if(FSS.Renderer.prototype.clear.call(this),!this.unsupported)return this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this},FSS.WebGLRenderer.prototype.render=function(t){if(FSS.Renderer.prototype.render.call(this,t),!this.unsupported){var e,i,r,n,s,o,a,h,c,l,u,f,d,S,m,g=!1,p=t.lights.length,b=0;if(this.clear(),this.lights!==p){if(this.lights=p,!(this.lights>0))return;this.buildProgram(p)}if(this.program){for(e=t.meshes.length-1;e>=0;e--)i=t.meshes[e],i.geometry.dirty&&(g=!0),i.update(t.lights,!1),b+=3*i.geometry.triangles.length;if(g||this.vertices!==b){this.vertices=b;for(h in this.program.attributes){for(l=this.program.attributes[h],l.data=new FSS.Array(b*l.size),d=0,e=t.meshes.length-1;e>=0;e--)for(i=t.meshes[e],r=0,n=i.geometry.triangles.length;r<n;r++)for(s=i.geometry.triangles[r],S=0,m=s.vertices.length;S<m;S++){switch(vertex=s.vertices[S],h){case"side":this.setBufferData(d,l,i.side);break;case"position":this.setBufferData(d,l,vertex.position);break;case"centroid":this.setBufferData(d,l,s.centroid);break;case"normal":this.setBufferData(d,l,s.normal);break;case"ambient":this.setBufferData(d,l,i.material.ambient.rgba);break;case"diffuse":this.setBufferData(d,l,i.material.diffuse.rgba)}d++}this.gl.bindBuffer(this.gl.ARRAY_BUFFER,l.buffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,l.data,this.gl.DYNAMIC_DRAW),this.gl.enableVertexAttribArray(l.location),this.gl.vertexAttribPointer(l.location,l.size,this.gl.FLOAT,!1,0,0)}}for(this.setBufferData(0,this.program.uniforms.resolution,[this.width,this.height,this.width]),o=p-1;o>=0;o--)a=t.lights[o],this.setBufferData(o,this.program.uniforms.lightPosition,a.position),this.setBufferData(o,this.program.uniforms.lightAmbient,a.ambient.rgba),this.setBufferData(o,this.program.uniforms.lightDiffuse,a.diffuse.rgba);for(c in this.program.uniforms)switch(l=this.program.uniforms[c],f=l.location,u=l.data,l.structure){case"3f":this.gl.uniform3f(f,u[0],u[1],u[2]);break;case"3fv":this.gl.uniform3fv(f,u);break;case"4fv":this.gl.uniform4fv(f,u)}}return this.gl.drawArrays(this.gl.TRIANGLES,0,this.vertices),this}},FSS.WebGLRenderer.prototype.setBufferData=function(t,e,i){if(FSS.Utils.isNumber(i))e.data[t*e.size]=i;else for(var r=i.length-1;r>=0;r--)e.data[t*e.size+r]=i[r]},FSS.WebGLRenderer.prototype.buildProgram=function(t){if(!this.unsupported){var e=FSS.WebGLRenderer.VS(t),i=FSS.WebGLRenderer.FS(t),r=e+i;if(!this.program||this.program.code!==r){var n=this.gl.createProgram(),s=this.buildShader(this.gl.VERTEX_SHADER,e),o=this.buildShader(this.gl.FRAGMENT_SHADER,i);if(this.gl.attachShader(n,s),this.gl.attachShader(n,o),this.gl.linkProgram(n),!this.gl.getProgramParameter(n,this.gl.LINK_STATUS)){var a=this.gl.getError(),h=this.gl.getProgramParameter(n,this.gl.VALIDATE_STATUS);return console.error("Could not initialise shader.\nVALIDATE_STATUS: "+h+"\nERROR: "+a),null}return this.gl.deleteShader(o),this.gl.deleteShader(s),n.code=r,n.attributes={side:this.buildBuffer(n,"attribute","aSide",1,"f"),position:this.buildBuffer(n,"attribute","aPosition",3,"v3"),centroid:this.buildBuffer(n,"attribute","aCentroid",3,"v3"),normal:this.buildBuffer(n,"attribute","aNormal",3,"v3"),ambient:this.buildBuffer(n,"attribute","aAmbient",4,"v4"),diffuse:this.buildBuffer(n,"attribute","aDiffuse",4,"v4")},n.uniforms={resolution:this.buildBuffer(n,"uniform","uResolution",3,"3f",1),lightPosition:this.buildBuffer(n,"uniform","uLightPosition",3,"3fv",t),lightAmbient:this.buildBuffer(n,"uniform","uLightAmbient",4,"4fv",t),lightDiffuse:this.buildBuffer(n,"uniform","uLightDiffuse",4,"4fv",t)},this.program=n,this.gl.useProgram(this.program),n}}},FSS.WebGLRenderer.prototype.buildShader=function(t,e){if(!this.unsupported){var i=this.gl.createShader(t);return this.gl.shaderSource(i,e),this.gl.compileShader(i),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)?i:(console.error(this.gl.getShaderInfoLog(i)),null)}},FSS.WebGLRenderer.prototype.buildBuffer=function(t,e,i,r,n,s){var o={buffer:this.gl.createBuffer(),size:r,structure:n,data:null};switch(e){case"attribute":o.location=this.gl.getAttribLocation(t,i);break;case"uniform":o.location=this.gl.getUniformLocation(t,i)}return s&&(o.data=new FSS.Array(s*r)),o},FSS.WebGLRenderer.VS=function(t){return["precision mediump float;","#define LIGHTS "+t,"attribute float aSide;","attribute vec3 aPosition;","attribute vec3 aCentroid;","attribute vec3 aNormal;","attribute vec4 aAmbient;","attribute vec4 aDiffuse;","uniform vec3 uResolution;","uniform vec3 uLightPosition[LIGHTS];","uniform vec4 uLightAmbient[LIGHTS];","uniform vec4 uLightDiffuse[LIGHTS];","varying vec4 vColor;","void main() {","vColor = vec4(0.0);","vec3 position = aPosition / uResolution * 2.0;","for (int i = 0; i < LIGHTS; i++) {","vec3 lightPosition = uLightPosition[i];","vec4 lightAmbient = uLightAmbient[i];","vec4 lightDiffuse = uLightDiffuse[i];","vec3 ray = normalize(lightPosition - aCentroid);","float illuminance = dot(aNormal, ray);","if (aSide == 0.0) {","illuminance = max(illuminance, 0.0);","} else if (aSide == 1.0) {","illuminance = abs(min(illuminance, 0.0));","} else if (aSide == 2.0) {","illuminance = max(abs(illuminance), 0.0);","}","vColor += aAmbient * lightAmbient;","vColor += aDiffuse * lightDiffuse * illuminance;","}","vColor = clamp(vColor, 0.0, 1.0);","gl_Position = vec4(position, 1.0);","}"].join("\n")},FSS.WebGLRenderer.FS=function(t){return["precision mediump float;","varying vec4 vColor;","void main() {","gl_FragColor = vColor;","}"].join("\n")},FSS.SVGRenderer=function(){FSS.Renderer.call(this),this.element=document.createElementNS(FSS.SVGNS,"svg"),this.element.setAttribute("xmlns",FSS.SVGNS),this.element.setAttribute("version","1.1"),this.element.style.display="block",this.setSize(300,150)},FSS.SVGRenderer.prototype=Object.create(FSS.Renderer.prototype),FSS.SVGRenderer.prototype.setSize=function(t,e){return FSS.Renderer.prototype.setSize.call(this,t,e),this.element.setAttribute("width",t),this.element.setAttribute("height",e),this},FSS.SVGRenderer.prototype.clear=function(){FSS.Renderer.prototype.clear.call(this);for(var t=this.element.childNodes.length-1;t>=0;t--)this.element.removeChild(this.element.childNodes[t]);return this},FSS.SVGRenderer.prototype.render=function(t){FSS.Renderer.prototype.render.call(this,t);var e,i,r,n,s,o;for(e=t.meshes.length-1;e>=0;e--)if(i=t.meshes[e],i.visible)for(i.update(t.lights,!0),r=i.geometry.triangles.length-1;r>=0;r--)n=i.geometry.triangles[r],n.polygon.parentNode!==this.element&&this.element.appendChild(n.polygon),s=this.formatPoint(n.a)+" ",s+=this.formatPoint(n.b)+" ",s+=this.formatPoint(n.c),o=this.formatStyle(n.color.format()),n.polygon.setAttributeNS(null,"points",s),n.polygon.setAttributeNS(null,"style",o);return this},FSS.SVGRenderer.prototype.formatPoint=function(t){return this.halfWidth+t.position[0]+","+(this.halfHeight-t.position[1])},FSS.SVGRenderer.prototype.formatStyle=function(t){var e="fill:"+t+";";return e+="stroke:"+t+";"},t.exports=FSS},function(t,e){t.exports=function(t,e,i,r,n){var s,o=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,o=t.default);var h="function"==typeof o?o.options:o;e&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns),r&&(h._scopeId=r);var c;if(n?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},h._ssrRegister=c):i&&(c=i),c){var l=h.functional,u=l?h.render:h.beforeCreate;l?h.render=function(t,e){return c.call(e),u(t,e)}:h.beforeCreate=u?[].concat(u,c):[c]}return{esModule:s,exports:o,options:h}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"shader"},[t._t("default")],2)},staticRenderFns:[]}},function(t,e,i){var r=i(3);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);i(9)("03a00953",r,!0)},function(t,e,i){function r(t){for(var e=0;e<t.length;e++){var i=t[e],r=l[i.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](i.parts[n]);for(;n<i.parts.length;n++)r.parts.push(s(i.parts[n]));r.parts.length>i.parts.length&&(r.parts.length=i.parts.length)}else{for(var o=[],n=0;n<i.parts.length;n++)o.push(s(i.parts[n]));l[i.id]={id:i.id,refs:1,parts:o}}}}function n(){var t=document.createElement("style");return t.type="text/css",u.appendChild(t),t}function s(t){var e,i,r=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(r){if(S)return m;r.parentNode.removeChild(r)}if(g){var s=d++;r=f||(f=n()),e=o.bind(null,r,s,!1),i=o.bind(null,r,s,!0)}else r=n(),e=a.bind(null,r),i=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else i()}}function o(t,e,i,r){var n=i?"":r.css;if(t.styleSheet)t.styleSheet.cssText=p(e,n);else{var s=document.createTextNode(n),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(s,o[e]):t.appendChild(s)}}function a(t,e){var i=e.css,r=e.media,n=e.sourceMap;if(r&&t.setAttribute("media",r),n&&(i+="\n/*# sourceURL="+n.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var h="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!h)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=i(10),l={},u=h&&(document.head||document.getElementsByTagName("head")[0]),f=null,d=0,S=!1,m=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,i){S=i;var n=c(t,e);return r(n),function(e){for(var i=[],s=0;s<n.length;s++){var o=n[s],a=l[o.id];a.refs--,i.push(a)}e?(n=c(t,e),r(n)):n=[];for(var s=0;s<i.length;s++){var a=i[s];if(0===a.refs){for(var h=0;h<a.parts.length;h++)a.parts[h]();delete l[a.id]}}}};var p=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var i=[],r={},n=0;n<e.length;n++){var s=e[n],o=s[0],a=s[1],h=s[2],c=s[3],l={id:t+":"+n,css:a,media:h,sourceMap:c};r[o]?r[o].parts.push(l):i.push(r[o]={id:o,parts:[l]})}return i}}])});
//# sourceMappingURL=vue.fss.js.map