# w3-moment2
Repo för uppgift 1 i Webbutveckling III

## Automatisering
Att automatisera processer vid utveckling av webbsidor och webbapplikationer är ett mycket bra sätt att spara tid. Istället för att göra repetitiva uppgifter manuellt så skrivs istället ett skript som hanterar allt automatiskt.
Exempelvis så kan skriptet lyssna efter ändringar i filstrukturen och köra olika funktioner beroende på vilka filer som ändras.
## Verktyg
Flera verktyg har använts för att lösa denna uppgift, en kort förklaring av dem finns i listan nedan.
* **Node.js** - Node.js är ett JavaScripts-system som arbetar händelsebaserat och asynkront.
* **Gulp** - Gulp är en så kallad task runner som kan automatisera olika uppgifter för att effektivisera utveckling av webbplatser och webbapplikationer.
* **NPM** - NPM står för Node Package Manager och är ett bibliotek för olika "paket". Ett paket kan ses som en liten modul som kan laddas ner för att utöka funktionalitet i ett projekt. Vissa paket innehåller funktionalitet för att automatisera olika uppgifter tillsammans med Gulp.
* **Git** - Git är ett versionshanteringssystem som underlättar arbetet med projekt genom att hålla reda på olika versioner av ett system.
* **Github** - Github är en plattform för att spara projekt online. Andra utvecklare kan lätt ta del av projektet om det tillåts.
* **Terminalen** - Via terminalen så kan olika kommandon användas för att arbeta med både Gulp och Git. 
## Paket
För att lösa uppgiften har ett antal paket från NPM använts. Dessa ligger i filen package.json.
* **gulp** - gulp är i sig ett paket som laddas ner för att sedan kunna automatisera uppgifter via andra paket. 
* **gulp-clean-css** - gulp-clean-css är ett paket som komprimerar CSS-filer
* **gulp-concat** - gulp-concat slår ihop filer till en och samma. Exempelvis kan flera CSS-filer slås ihop till en enskild.
* **gulp-uglify** - gulp-uglify komprimerar JavaScripts-filer.
* **gulp-watch** - gulp-watch är ett paket som lyssnar efter ändringar i filer och som sedan utför uppgifter.
## Beskrivning av systemet

### Node.js & NPM
För att systemet ska fungera så krävs först att Node.js är installerat på din lokala maskin. När Node.js installeras så tillkommer även funktionalitet för att använda NPM.

För att initialisera ett NPM projekt används terminalen. Genom att navigera terminalen till projektkatalogen och sedan skriva in kommandot `npm init`. Kommandot startar en guide där information om projektet kan läggas till, exempelvis namn på projektet och vilken version det handlar om. När projektet är initialiserat skapas en fil som heter package.json. Denna fil kommer innehålla alla framtida paket som används i projektet. Denna fil är även nödvändig om andra utvecklare ska jobba med projektet.

Paket installeras via kommandot `npm install [paketnamn] --save-dev` och varje paket sparas sedan automatiskt till package.json. 

### gulpfile.js
För att skapa automatisering av uppgifter med gulp så krävs en så kallad gulpfile.js, i denna JavaScripts-fil så definieras vilka uppgifter och i vilken ordning de ska köras. Gulpfile.js ska ligga i root-katalogen av projektet. 

Alla paket som har installerats hämtas in i gulpfile.js via `require()` som är en funktion att ladda in moduler i Node.js. 

Exempel: `var  gulp  =  require('gulp');`

För att skapa uppgifter som gulp ska automatisera så skapas en procedur för varje uppgift. Majoriteten av procedurerna i detta moment har följande struktur:
1. Skapa procedur med ett namn
2. Vilka filer gäller det och vart ligger dem?
3. Utför en eller flera uppgift(er).
4. Flytta de berörda filerna till en ny katalog

Exempel:  JavaScripts-filer slås ihop.
``` javascript 
// Uppgift skapas med ett namn
gulp.task('concat-js', function(){
	return gulp.src('dev/js/*.js') // Vilka filer som ska hanteras
			.pipe(concat('main.min.js')) // Vad som ska hända med filerna
			.pipe(gulp.dest('dist/js/')); // Flytta de färdiga filerna till annan katalog
});
```
Det går även att skapa en kedja av saker som ska hända med de valda filerna.

Exempel: JavaScript-filer slås ihop och komprimeras.
``` javascript
gulp.task('concat-js', function(){
	return  gulp.src('dev/js/*.js') 
		.pipe(concat('main.min.js'))
		.pipe(uglify()) // Extra funktion för att komprimera de ihopslagna js-filerna
		.pipe(gulp.dest('dist/js/'));
});
```
Det går att köra varje procedur manuellt genom att skriva kommandot `gulp [namn på procedur]` i terminalen. Det går även att lägga till procedurer till en standarduppgift som körs med kommandot `gulp`. 

Exempel: Uppgifter som körs vid kommandot `gulp`
``` javascript 
gulp.task('default',['concat-js', 'concat-css', 'copy-img', 'copy-html', 'watcher'], function() {
	console.log("Default task is run");
});
```
Ett alternativ till att köra procedurer manuellt är att lyssna efter ändringar i filer och filstrukturen och sedan låta gulp hantera resten. Exemplet nedan använder paketet gulp-watch.

Exempel: Uppgift körs när JavaScript-filer ändras

``` javascript
gulp.task('watcher', function(){
	watch('dev/js/*.js', function(){ // Vilka filer som ska lyssnas på
		gulp.start('concat-js'); // Vilken uppgift som ska köras när ändring sker
	});
});
```

### Ingående beskrivning av system
I automatiseringen för moment 2 hanteras följande filer på ett eller annat sätt: 
* HTML
* Bilder
* CSS
* JavaScript

När ändringar sker för ovanstående filer så körs skapade uppgifter automatiskt med hjälp av paketet gulp-watch.  För momentet så skapas även två olika kataloger, en katalog för utveckling där alla arbetsfiler ligger och en katalog för färdig kod som är redo att användas i produktion. I mina exempel kallas utvecklingskatalogen "dev" och produktionskatalogen "dist"

#### HTML 
Vid ändringar av HTML-filer kopieras de från dev-katalogen till dist-katalogen. Detta kräver inget extra paket utan kan hanteras direkt i gulp
``` javascript 
gulp.task('copy-html', function(){
	return  gulp.src('dev/*.html') 
			.pipe(gulp.dest('dist/')); 
});
```

#### Bilder
Samma som HTML-filer gäller projektets bilder, de kopieras över från dev-katalogen till dist-katalogen vid ändringar. Proceduren flyttar enbart bildfiler med filändelserna: gif, jpg, png och svg.
``` javascript 
gulp.task('copy-img', function(){
	return  gulp.src('dev/img/*.{gif,jpg,png,svg}')
			.pipe(gulp.dest('dist/img/'));
});
```
#### CSS
CSS-filer genomgår flera steg innan de förflyttas till dist-katalogen. Först slås alla CSS-filer som finns i dev-katalogen ihop till en CSS-fil, detta görs via paketet gulp-concat. Efter CSS-filerna är hopslagna så komprimeras den nya filen ner med paketet gulp-clean-css. När allt är klart så flyttas sen den nya filen till dist-katalogen.

``` javascript
gulp.task('concat-css', function(){
	return  gulp.src('dev/css/*.css')
			.pipe(concat('style.min.css'))
			.pipe(cleancss())
			.pipe(gulp.dest('dist/css/')); 
});
```

#### JavaScript
JavaScripts-filer genomgår samma steg som CSS-filerna. Först slås filerna ihop till en enskild med paketet gulp-concat och efter det så komprimeras den nya filen. JavaScripts-filer använder dock ett annat paket än CSS, detta heter gulp-uglify. När alla uppgifter har genomförts så flyttas den nya filen till dist-katalogen.

``` javascript
gulp.task('concat-js', function(){
	return  gulp.src('dev/js/*.js')
			.pipe(concat('main.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js/'));
});
```
#### Watcher
För att lyssna på ändringar i filstruktur och filer så används paketet gulp-watch. Med detta paket går det att köra valda uppgifter automatiskt när en ändring sker i dev-katalogen.

``` javascript
gulp.task('watcher', function(){
	watch('dev/js/*.js', function(){
		gulp.start('concat-js');
	});

	watch('dev/css/*.css', function(){
		gulp.start('concat-css');
	});

	watch('dev/img/*.{gif,jpg,png,svg}', function(){
		gulp.start('copy-img');
	});

	watch('dev/*.html', function(){
		gulp.start('copy-html');
	});
});
```
#### Default
Alla uppgifter finns registrerade i en standarduppgift, så när gulp startar så körs alla procedurer en gång och sedan tar gulp-watch över och lyssnar efter ändringar.

### Köra systemet
1. Klona repot via terminalen med kommandot `git clone https://github.com/Devsper/w3-moment2.git `
2. Öppna terminalen i projektkatalogen och ladda sedan ner alla paket med kommandot `npm install`
3. För att starta automatisering så är det bara att köra skriva kommandot `gulp` i terminalen.