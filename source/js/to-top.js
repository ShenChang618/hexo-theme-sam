( function () {
  var div = null,
      a = null,
      doc = {
        main: document.getElementById( "main" )
      };

  if ( doc.main.scrollHeight > document.body.clientHeight ) {
    div = document.createElement( "div" );
    div.id = "top";

    a = '<a class="toTop" id="toTop" href="#top" title="toTop"><i class="toTop-icon iconfont icon-top"></i></a>';

    doc.main.insertBefore( div, doc.main.firstChild );
    doc.main.innerHTML += a;
    document.getElementById( "toTop" ).style.display = "block";
  }
} )();
