var escena, camara, renderer, controlCamara, tierra, marte, mercurio, venus, jupiter, sol , nube, clock;
var pivotPointMercurio,pivotPointvenus, pivotPointTierra, pivotPointNube,pivotPointmarte,pivotPointjupiter;

function init() {
escena = new THREE.Scene();
crearRenderer();
crearCamara();
crearLuz();

crearSol();
crearTierra();
crearMarte();
crearJupiter();
crearMercurio();
crearVenus();
crearNubes();
//createAxisHelper();
document.body.appendChild(renderer.domElement);
crearReloj();
render();
animate();
}

function render() {
renderer.render(escena, camara);
controlCamara.update();
tierra.rotation.y += 0.0001;
nube.rotation.y += 0.0005;
requestAnimationFrame(render);
}

function animate() {
    requestAnimationFrame(animate);    
    var delta =  clock.getDelta();
    pivotPointMercurio.rotation.z += delta * 1;
    pivotPointvenus.rotation.z += delta * 0.5;
    pivotPointTierra.rotation.z += delta * 0.2;
    pivotPointNube.rotation.z += delta * 0.2;
    pivotPointmarte.rotation.z += delta * 0.1;
    pivotPointjupiter.rotation.z += delta * 0.05;
}

function crearReloj () {
	clock = new THREE.Clock();
}

function crearRenderer() {
renderer = new THREE.WebGLRenderer({alpha: true, antialias : true});
renderer.setClearColor(0x000000, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
}

function crearCamara() {
camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camara.position.x = 0;
camara.position.z = 10;
camara.position.y = -35;
camara.name = 'camara';
camara.lookAt(escena.position);
controlCamara = new THREE.OrbitControls(camara);
}


function crearTierra(){
var tierraGeometria = new THREE.SphereGeometry(3,100,100);
var tierraMaterial = crearMaterialTierra();
tierra = new THREE.Mesh(tierraGeometria, tierraMaterial);
tierra.name = 'tierra';
tierra.castShadow = true;
tierra.position.set(0,24,0)
escena.add(tierra);
pivotPointTierra = new THREE.Object3D();
pivotPointTierra.position.set(0,0,0);
pivotPointTierra.add(tierra);
escena.add( pivotPointTierra );
}

function crearMarte(){
var marteGeometria = new THREE.SphereGeometry(3,100,100);
var marteMaterial = crearMaterialMarte();
marte = new THREE.Mesh(marteGeometria, marteMaterial);
marte.name = 'marte';
marte.castShadow = true;
marte.position.set(0,30,0);
escena.add(marte);
pivotPointmarte = new THREE.Object3D();
pivotPointmarte.position.set(0,0,0);
pivotPointmarte.add(marte);
escena.add( pivotPointmarte );
}


function crearMercurio(){
var mercurioGeometria = new THREE.SphereGeometry(3,100,100);
var mercurioMaterial = crearMaterialMercurio();
mercurio = new THREE.Mesh(mercurioGeometria, mercurioMaterial);
mercurio.name = 'Mercurio';
mercurio.castShadow = true;
mercurio.position.set(0,10,0);
escena.add(mercurio);
pivotPointMercurio = new THREE.Object3D();
pivotPointMercurio.position.set(0,0,0);
pivotPointMercurio.add(mercurio);
escena.add( pivotPointMercurio );
}

function crearJupiter(){
var jupiterGeometria = new THREE.SphereGeometry(3,100,100);
var jupiterMaterial = crearMaterialJupiter();
jupiter = new THREE.Mesh(jupiterGeometria, jupiterMaterial);
jupiter.name = 'jupiter';
jupiter.castShadow = true;
jupiter.position.set(0,38,0)
escena.add(jupiter);
pivotPointjupiter = new THREE.Object3D();
pivotPointjupiter.position.set(0,0,0);
pivotPointjupiter.add(jupiter);
escena.add( pivotPointjupiter );
}

function crearSol(){
var solGeometria = new THREE.SphereGeometry(4,100,100);
var solMaterial = crearMaterialSol();
sol = new THREE.Mesh(solGeometria, solMaterial);
sol.name = 'sol';
sol.castShadow = true;
sol.position.set(0,0,0);
escena.add(sol);
}

function crearVenus(){
var venusGeometria = new THREE.SphereGeometry(3,100,100);
var venusMaterial = crearMaterialVenus();
venus = new THREE.Mesh(venusGeometria, venusMaterial);
venus.name = 'venus';
venus.castShadow = true;
venus.position.set(0,18,0)
escena.add(venus);
pivotPointvenus = new THREE.Object3D();
pivotPointvenus.position.set(0,0,0);
pivotPointvenus.add(venus);
escena.add( pivotPointvenus );
}

function crearMaterialMarte(){
var marteTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/marscolor.jpg', function (image){
marteTextura.image = image;
marteTextura.needsUpdate = true;
});
var normalTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/marsnormal.jpg', function(image){
normalTextura.image = image;
normalTextura.needsUpdate = true;
});


var especularTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/marsbump.jpg', function(image){
especularTextura.image = image;
especularTextura.needsUpdate = true;
});

marteMaterial = new THREE.MeshPhongMaterial();
marteMaterial.map = marteTextura;

marteMaterial.normalMap = normalTextura ;
marteMaterial.normalScale = new THREE.Vector2( 0.7, 0.7 );
marteMaterial.especularMap = especularTextura;
marteMaterial.specular = new THREE.Color(0x262626);
return marteMaterial;
}

function createAxisHelper () {
axis = THREE.AxisHelper(20);
axis.position.z = 1;
escena.add(axis);
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

mercurioMaterial = new THREE.MeshPhongMaterial();
mercurioMaterial.map = mercurioTextura;

mercurioMaterial.especularMap = especularTextura;
mercurioMaterial.specular = new THREE.Color(0x262626);
return mercurioMaterial;
}

function crearMaterialJupiter(){
var jupiterTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/jupitercolor_4k.jpg', function (image){
jupiterTextura.image = image;
jupiterTextura.needsUpdate = true;
});

jupiterMaterial = new THREE.MeshPhongMaterial();
jupiterMaterial.map = jupiterTextura;
return jupiterMaterial;
}

function crearMaterialSol(){
var solTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/sunmap.jpg', function (image){
solTextura.image = image;
solTextura.needsUpdate = true;
});

solMaterial = new THREE.MeshBasicMaterial();
solMaterial.map = solTextura;
return solMaterial;
}

function crearMaterialVenus(){
var venusTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/venusmap.jpg', function (image){
venusTextura.image = image;
venusTextura.needsUpdate = true;
});

var especularTextura = new THREE.Texture();
var loader = new THREE.ImageLoader();
loader.load('texturas/venusbump.jpg', function(image){
especularTextura.image = image;
especularTextura.needsUpdate = true;
});

venusMaterial = new THREE.MeshPhongMaterial();
venusMaterial.map = venusTextura;

venusMaterial.especularMap = especularTextura;
venusMaterial.specular = new THREE.Color(0x262626);
return venusMaterial;
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
var ambient = new THREE.AmbientLight(0xffffff,0.3);
escena.add(ambient);
escena.add(luzDireccional);
var luzAmbiental = new THREE.AmbientLight(0x111111);
escena.add(luzAmbiental);
}

function crearNubes (){
var esferaGeometria = new THREE.SphereGeometry(3.1,50,50);
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
nube.position.set(0,24,0)
escena.add(nube);
pivotPointNube = new THREE.Object3D();
pivotPointNube.position.set(0,0,0);
pivotPointNube.add(nube);
escena.add( pivotPointNube );
}