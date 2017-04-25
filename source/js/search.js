/**
 * 搜索功能
 **/
( function () {
  var dom = {
    searchText: document.getElementById( "search-text" ),
    searchBtn: document.getElementById("search-btn"),
    searchClose: document.getElementById( "search-close" ),
    searchWrapper: document.getElementById( "search-wrapper" ),
    searchData: document.getElementById( "search-data" ),
    searchFrom: document.getElementById( "search-from" ),
  };

  // 禁止表单回车提交
  dom.searchFrom.onsubmit = function ( event ) {
    event.preventDefault();
  };

  // 搜索
  dom.searchBtn.onclick = function () {
    search( dom.searchText.value );
  };

  // 关闭
  dom.searchClose.onclick = function () {
    dom.searchData.style.display = "none";
    dom.searchWrapper.innerHTML = "";
  };


  // ajax 加载数据
  function loadData( callback ) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if ( xhr.readyState === 4 ) {
        if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 304 ) {
          callback( JSON.parse( xhr.responseText ) );
        } else {
          throw new Error( "Request was unsuccessful: " + xhr.status );
        }
      }
    }

    xhr.open( "get", "/content.json", true );
    xhr.send( null );
  }

  // 注入
  function render( dom, data ) {
    var html = "",
        tags = "",
        categories = "";

    data.forEach( function ( item ) {
      tags = "";
      categories = "";

      if ( item.categories.length ) {
        // 我这里只有考虑一个分类的情况，文章需要两个分类吗？
        categories = '<a href="' + item.categories[ 0 ].permalink +
        '" title="' + item.categories[ 0 ].slug +
        '" class="post-categories">' + item.categories[ 0 ].name +
        '</a>'
      }

      if ( item.tags.length ) {
        item.tags.forEach( function ( item ) {
          tags += '<a href="' + item.permalink +
          '" title="' + item.slug +
          '" class="post-tags"><i class="post-tags-icon iconfont icon-biaoqian"></i>' + item.name +
          '</a>'
        } );
      }

      html += '<section class="search-data-item"><h3 class="search-data-title"><a href="/' + item.path +
        '" title="' + item.path +
        '" class="search-data-link">' + item.title +
        '</a></h3>' + '<p class="search-data-text">' + item.text +
        '</p>' + '<p  class="post-meta">' + categories + tags +
        '<span class="post-time">' + item.date.slice(0, 10) +
        '</span></p></section>';
    } );

    dom.innerHTML = html;
  }

  // 去除左右空格
  function trim( text ) {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    return text == null ? "" : text.replace( rtrim, "" );
  }

  // 判断关键字
  function match( post, regExp ) {
    // 优先级 title > categories > tags > text
    return regExp.test( post.title ) ||
      ( post.categories && post.categories.some( function ( categorie ) {
        return regExp.test( categorie.name );
      } ) ) ||
      ( post.tags && post.tags.some( function ( tag ) {
        return regExp.test( tag.name );
      } ) ) ||
      regExp.test( post.text );
  }

  // 替换高亮文本，可以和注入合并，但是程序的扩展性和可读性那就真没了
  function replace( data, regExp ) {
    var key = null;

    data.forEach( function ( post ) {
      for ( key in post ) {
        if ( key === "title" || key === "text" ) {
          post[ key ] = ( post[ key ].match( regExp ) && post[ key ].replace( regExp, '<strong class="search-STRONG">' + RegExp.$1 + '</strong>' ) ) || post[ key ];
        } else if ( key === "categories" || key === "tags" ) {
          if ( post[ key ].length ) {
            post[ key ].forEach( function ( item, index ) {
              post[ key ][ index ].name = ( item.name.match( regExp ) && item.name.replace( regExp, '<strong class="search-STRONG">' + RegExp.$1 + '</strong>' ) ) || item.name;
            } );
          }
        }
      }
    } );

    return data;
  }

  // 借用了 jQuery 的数组内容判断函数
  function inArray( elem, arr, i ) {
    return arr == null ? -1 : Array.prototype.indexOf.call( arr, elem, i );
  }

  function search( key ) {
    if ( key = trim( key ) ) {
      var result = [],
          regExp = new RegExp( "(" + key.replace( /\s/g, "|" ) + ")", "gmi" );

      loadData( function ( data ) {
        result = data.filter( function ( post ) {
          return match( post, regExp );
        } );

        if ( result.length ) {
          result = replace( result, regExp );
          render( dom.searchWrapper, result );
          dom.searchData.style.display = "block";
        }
      } );
    }
  }
} )();
