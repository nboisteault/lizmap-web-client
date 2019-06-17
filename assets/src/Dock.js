// Create new dock, minidock, right-dock or bottomdock
// Example : lizMap.addDock('mydock', 'My dock title', 'dock', 'Some content', 'icon-pencil');
// see icon list here : http://getbootstrap.com/2.3.2/base-css.html#icons

class Dock {

	static add( dname, dlabel, dtype, dcontent, dicon){
      // First check if this dname already exists
      if( $('#mapmenu .nav-list > li.'+dname+' > a').length ){
          console.log(dname + ' menu item already exists');
          return;
      }

      // Create menu icon for activating dock
      var dockli = '';
      dockli+='<li class="'+dname+' nav-'+dtype+'">';
      dockli+='   <a id="button-'+dname+'" rel="tooltip" data-original-title="'+dlabel+'" data-placement="right" href="#'+dname+'" data-container="#content">';
      dockli+='       <span class="icon"><i class="'+dicon+' icon-white"></i></span>';
      dockli+='   </a>';
      dockli+='</li>';
      $('#mapmenu div ul li.nav-'+dtype+':last').after(dockli);
      if ( $('#mapmenu div ul li.nav-'+dtype+'.'+dname).length == 0 ){
      	$('#mapmenu div ul li:last').after(dockli);
      }

      //  Remove native lizmap icon
      $('#mapmenu .nav-list > li.'+dname+' > a .icon').css('background-image','none');
      $('#mapmenu .nav-list > li.'+dname+' > a .icon >i ').css('margin-left', '4px');

      // Add tooltip
      $('#mapmenu .nav-list > li.'+dname+' > a').tooltip();

      // Create dock tab content
      var docktab = '';
      docktab+='<div class="tab-pane" id="'+dname+'">';
      if( dtype == 'minidock'){
          docktab+='<div class="mini-dock-close" title="close" style="padding:7px;float:right;cursor:pointer;"><i class="icon-remove icon-white"></i></div>';
          docktab+='    <div class="'+dname+'">';
          docktab+='        <h3>';
          docktab+='            <span class="title">';
          docktab+='              <i class="'+dicon+' icon-white"></i>';
          docktab+='              <span class="text">&nbsp;'+dlabel+'&nbsp;</span>';
          docktab+='            </span>';
          docktab+='        </h3>';
      }
      docktab+='        <div class="menu-content">';
      docktab+= dcontent;
      docktab+='        </div>';
      docktab+='    </div>';
      docktab+='</div>';
      if( dtype == 'minidock'){
          $('#mini-dock-content').append(docktab);
          $('#'+dname+' div.mini-dock-close').click(function(){
            if( $('#mapmenu .nav-list > li.'+dname).hasClass('active') ){
                $('#button-'+dname).click();
            }
          });
      }
      else if( dtype == 'right-dock' )
          $('#right-dock-content').append(docktab);
      else if( dtype == 'dock' )
          $('#dock-content').append(docktab);
      else if( dtype == 'bottomdock' )
          $('#bottom-dock-content').append(docktab);

      // Create dock tab li
      var docktabli = '';
      docktabli+= '<li id="nav-tab-'+dname+'"><a href="#'+dname+'" data-toggle="tab">'+dlabel+'</a></li>';
      if( dtype == 'minidock')
          $('#mini-dock-tabs').append(docktabli);
      else if( dtype == 'right-dock' )
          $('#right-dock-tabs').append(docktabli);
      else if( dtype == 'dock' )
          $('#dock-tabs').append(docktabli);
      else if( dtype == 'bottomdock' )
          $('#bottom-dock-tabs').append(docktabli);

  }
}

export default Dock;