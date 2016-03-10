// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

console.log('From application global context');

module.exports = function() {
    console.log('From application exported function');

    var time = function(time){
        setTimeout(function(){
            console.log('in interval');
        },time*1000);
    }

    time(1);
};
