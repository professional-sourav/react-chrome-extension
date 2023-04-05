const getDomPath = (el: any) => {
  var stack = [];
  while ( el.parentNode != null ) {
    console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if ( el.hasAttribute('id') && el.id != '' ) {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if ( sibCount > 1 ) {
      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }

  return stack.slice(1); // removes the html element
}

function App() {

  const href = window.location.href;

  // console.log(document.body);
 
  document.body.addEventListener('click', event => {
    // console.log(event.target);
    var path = getDomPath(event.target);
    console.log(path.join(' > '));
  })

  return (
    <div>
      <header>
        <h5>Hello From React Chrome App {href}</h5>
      </header>
    </div>
  )
}

export default App
