var browserSync = require('browser-sync');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path')

gulp.task('html',function(){
　　 // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    return gulp.src(['src/**/*.html','!src/include/**/*.html'])
    .pipe(plugins.fileInclude({
        prefix: '@@',
        basepath: process.cwd() + '/src/',
        content:{
            template:''
        }
    }))
    .pipe(plugins.useref({searchPath:'dist/'}))
    // .pipe(plugins.revCollector({replaceReved: true,}))//hash缓存
    // .pipe(plugins.rev())//hash缓存
    // .pipe(plugins.revReplace())//从命名
    .pipe(gulp.dest('dist'));
});

gulp.task('css',function(){
    return gulp.src(['src/**/*.css','src/**/*.scss','!src/include/**/*.{css,scss}'])
    .pipe(plugins.sass.sync().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers: ['last 3 versions', 'not ie < 8'],
        cascade: true,
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('js',function(){
    return gulp.src(['src/**/*.js','!src/include/**/*.js'])
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts',function(){
    return gulp.src(['src/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img',function(){ //压缩图片服务
    return gulp.src(['src/**/*.{jpg,png,gif,ico}'])
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('dist'))
});

gulp.task('iconfont', function () {
    return gulp.src(['src/**/*.svg'])
    .pipe(plugins.svgmin({ //压缩svg
        cleanupNumericValues: {
            floatPrecision: 2
        },
        js2svg: {
            pretty: true
        }
    }))
    .pipe(plugins.iconfontCssAndTemplate({ //生成字体图标库
        fontName: 'iconfont',
        cssClass: 'gmIcon',
        cssTargetPath: 'iconfont.css'
    }))
    .pipe(plugins.iconfont({ 
        fontName: 'iconfont', //字体名 
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'] //输出的字体文件格式 
    }))
    .pipe(gulp.dest('dist/font')); 
});

gulp.task('zip',function(){
    return gulp.src(['dist/**'])
    .pipe(plugins.zip('web.zip'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('default',['css','html','js','fonts','img'], function() {
    
    // 启动服务器
    browserSync({
        server:{
            baseDir: './dist/'
        }
    });
    // 检测 三层遍历
    gulp.watch(['src/**/**/*.{html,js}'],['html','css','js','fonts','img']).on('change',function(event){
        // 检测删除文件
        if (event.type === 'deleted'){
            gulp.src(event.path.replace('\\src\\','\\dist\\'))
            .pipe(plugins.clean())
        }
        // 热更新
        browserSync.reload()
    });
    // 两层遍历
    gulp.watch(['src/**/**/*.css','src/**/**/*.scss'],['html','css']);
});


gulp.task('html2',['css','html'], function() {
    
    // 启动服务器
    browserSync({
        server:{
            baseDir: './dist/'
        }
    });
    // 检测 三层遍历
    gulp.watch(['src/**/**/*.{html,js}'],['html','css']).on('change',function(event){
        // 检测删除文件
        if (event.type === 'deleted'){
            gulp.src(event.path.replace('\\src\\','\\dist\\'))
            .pipe(plugins.clean())
        }
        // 热更新
        browserSync.reload()
    });
    // 两层遍历
    gulp.watch(['src/**/**/*.css','src/**/**/*.scss'],['html','css']);
});

// 整理整体结构，方便开发模块
// 整理常用开发jquery插件，工具
// include 下面放插件模板
// 梳理开发流程，简化写出使用文档