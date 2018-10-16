var escena, camara, renderer, controlCamara, tierra, nube;


function crearRenderer() {
renderer = new THREE.WebGLRenderer({alpha: true, antialias : true});
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
}


function crearCamara() {
camara = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.x = 0;
camara.position.y = 32;
camara.position.z = 32;
camara.name = 'camara';
camara.lookAt(escena.position);
controlCamara = new THREE.OrbitControls(camara);
}


function crearTierra(){
var tierraGeometria = new THREE.SphereGeometry(15,100,100);
//var tierraMaterial = crearMaterialTierra();
var tierraMaterial = crearMaterialMercurio();
tierra = new THREE.Mesh(tierraGeometria, tierraMaterial);
tierra.name = 'tierra';
tierra.castShadow = true;
tierra.position.y = 5;
escena.add(tierra);
}

function crearMaterialMercurio(){
var mercurioTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/mercurymap.jpg', function (image){
mercurioTextura.image = image;
mercurioTextura.needsUpdate = true;
});

var especularTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/mercurybump.jpg', function(image){
especularTextura.image = image;
especularTextura.needsUpdate = true;
});

mercurioTextura = new THREE.MeshPhongMaterial();
mercurioTextura.map = mercurioTextura;

mercurioTextura.especularMap = especularTextura;
mercurioTextura.specular = new THREE.Color(0x262626);
return mercurioTextura;
}

function crearMaterialTierra(){
var tierraTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/tierra.jpg', function (image){
tierraTextura.image = image;
tierraTextura.needsUpdate = true;
});
var normalTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/tierranormal.jpg', function(image){
normalTextura.image = image;
normalTextura.needsUpdate = true;
});


var especularTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/tierraespecular.jpg', function(image){
especularTextura.image = image;
especularTextura.needsUpdate = true;
});

tierraMaterial = new THREE.MeshPhongMaterial();
tierraMaterial.map = tierraTextura;

tierraMaterial.normalMap = normalTextura ;
tierraMaterial.normalScale = new THREE.Vector2( 0.7, 0.7 );
tierraMaterial.especularMap = especularTextura;
tierraMaterial.specular = new THREE.Color(0x262626);
return tierraMaterial;
}
function crearLuz() {
var luzDireccional = new THREE.DirectionalLight(0xffffff,1);
luzDireccional.position.set(100,100,-50);
luzDireccional.name = "luz direccional";
escena.add(luzDireccional);
var luzAmbiental = new THREE.AmbientLight(0x111111);
escena.add(luzAmbiental);
}

function crearNubes (){
var esferaGeometria = new THREE.SphereGeometry(10.1,50,50);
var nubeTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/nubes.png', function(image){
nubeTextura.image = image ;
nubeTextura.needsUpdate = true ;
});
var nubeMaterial = new THREE.MeshBasicMaterial();
nubeMaterial.map = nubeTextura ;
nubeMaterial.transparent = true ;
nube = new THREE.Mesh(esferaGeometria,nubeMaterial);
nube.name = 'nubes';
nube.position.y = 5;
escena.add(nube);
}
function init() {
escena = new THREE.Scene();
crearRenderer();
crearCamara();
crearLuz();
crearTierra();
crearNubes();
document.body.appendChild(renderer.domElement);
render();
}
function render() {
renderer.render(escena, camara);
controlCamara.update();
//tierra.rotation.y += 0.0001;
//nube.rotation.y += 0.0005;
requestAnimationFrame(render);
}
init();