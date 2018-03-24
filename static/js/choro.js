
function getColor(rank){
    console.log(rank);
    var col_list=['rgb(166,206,227)','rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)','rgb(227,26,28)','rgb(253,191,111)'];
    if(rank==1){
        return col_list[1];
    }
    else if(rank==2){
        return col_list[2];
  }
  else if(rank==3){
    return col_list[3];
  }
  else if(rank==4){
    return col_list[4];
  }
  else if(rank==5){
    return col_list[5];
  }
  else if(rank==6){
    return col_list[6];
  }
  else if(rank==7){
    return col_list[7];
  }
  else {
    return col_list[8];
  }
  
}
Plotly.d3.json('/analysis/Popular', function(error, rows){
    var states=[];
    var count=[];
    var genre=[];
    var rank_list=[1,2,3,4,5,6,7,8];
    var rank=[];
    var color_list = [];
    //console.log(rows[0].State);
      if (error) return console.warn(error);
      for(i=0;i<rows.length;i++){
          states.push(rows[i].State);
          count.push(rows[i].Count);
          genre.push(rows[i].Genre);

          if(rows[i].Genre=="Rock"){
              rank.push(rank_list[0]);
              color_list.push('#a6cee3');
          }
          else if(rows[i].Genre=="Pop"){
            rank.push(rank_list[1]);
            color_list.push('#1f78b4');
        }
        else if(rows[i].Genre=="Alternative"){
            rank.push(rank_list[2]);
            color_list.push('#fdbf6f');
        }
        else if(rows[i].Genre=="Metal"){
            rank.push(rank_list[3]);
            color_list.push('#b2df8a');
        }
        else if(rows[i].Genre=="Hip-Hop/Rap"){
            rank.push(rank_list[4]);
            color_list.push('#33a02c');
        }
        else if(rows[i].Genre=="Country"){
            rank.push(rank_list[5]);
            color_list.push('#e31a1c');
        }
        else if(rows[i].Genre=="Dance/Electronic"){
            rank.push(rank_list[6]);
            color_list.push('#fb9a99');
        }
        else {
            rank.push(rank_list[7]);
            color_list.push('#a6cee3');
        }
        
      }
      //console.log(color_list);
      //console.log(rank);
      //console.log(getColor(1));
      var colors= ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f'];
      var data = [{
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: states,
          z: rank,
          text: genre,
          colorscale:[
            [0, "#a6cee3"], 
            [0.142, "#1f78b4"], 
            [0.284, "#b2df8a"], 
            [0.426, "#33a02c"], 
            [0.568, "#fb9a99"], 
            [0.710, "#e31a1c"], 
            [1, "#fdbf6f"]],
          colorbar: {
              title: 'Popular Event Count',
              thickness: 5,
              titleside:'top',
              tickmode : 'array',
              tickvals : rank_list,
              ticktext : ['Rock','Pop','Alternative','Metal','Hip-Hop/Rap','Country','Dance/Electronic'],
              ticks : 'outside'
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];


      var layout = {
          title: 'Popular Genre By State',
          showlegend: true,
          geo:{
            scope: "usa",
            showland: true,
            landcolor: "rgb(242, 240, 247)",
            showlakes: true,
            lakecolor: "white",
            resolution: 50
          }
      };

      Plotly.newPlot("map", data, layout)
});