


    document.querySelector('#solve').onclick=function(){
        const node1=[];      const node2=[];
        const currentB=[];   const voltageB=[]; 
        const resBr=[];      const resLi=[];
        const node1L=[];     const node2L=[];
        const currentL=[];   const voltageL=[];
        const nodes=[];
    
    
        //Get values of Branches
        //Get Values of node 1
    
        const node1B = document.querySelectorAll("#node1Br");
        for (let i = 0;i < node1B.length;i++) {
            if(node1B[i].value != ''){
                node1.push(node1B[i].value);
                nodes.push(Number(node1B[i].value));
            }
        }
        //Get Values of node 2 
        const node2B = document.querySelectorAll("#node2Br");
        for (let i = 0;i < node2B.length;i++) {
            if(node2B[i].value != ''){
                node2.push(node2B[i].value);
                nodes.push(Number(node2B[i].value));

            }
        }
        //Get Values of Resistance 
        const resB = document.querySelectorAll("#resBr");
        for (let i = 0;i < resB.length;i++) {
            if(resB[i].value != ''){
                resBr.push(Number(resB[i].value));
            }
        }
    
    
        //Get Values of Current 
        const currentBr = document.querySelectorAll("#currentB");
        for (let i = 0;i < currentBr.length;i++) {
            if(currentBr[i].value != ''){
                currentB.push(Number(currentBr[i].value));
            }
        }
        
        //Get Values of Voltages
    
        const voltageBr = document.querySelectorAll("#voltageB");
        for (let i = 0;i < voltageBr.length;i++) {
            if(voltageBr[i].value != ''){
                voltageB.push(Number(voltageBr[i].value));
            }
        }
        //Get values of Links
        //Get Values of node 1
    
        const node1Li = document.querySelectorAll("#node1L");
        for (let i = 0;i < node1Li.length;i++) {
            if(node1Li[i].value != ''){
                node1L.push(node1Li[i].value);
                nodes.push(Number(node1Li[i].value));

            }
        }
        //Get Values of node 2 
        const node2Li = document.querySelectorAll("#node2L");
        for (let i = 0;i < node2Li.length;i++) {
            if(node2Li[i].value != ''){
                node2L.push(node2Li[i].value);
                nodes.push(Number(node2Li[i].value));

            }
        }
        //Get Values of Resistance 
        const resL = document.querySelectorAll("#resL");
        for (let i = 0;i < resL.length;i++) {
            if(resL[i].value != ''){
                resLi.push(Number(resL[i].value));
            }
        }
    
        //Get Values of Current 
        const currentLi = document.querySelectorAll("#currentL");
        for (let i = 0;i < currentLi.length;i++) {
            if(currentLi[i].value != ''){
                currentL.push(Number(currentLi[i].value));
            }
        }
        
        //Get Values of Voltages
    
        const voltageLi = document.querySelectorAll("#voltageL");
        for (let i = 0;i < voltageLi.length;i++) {
            if(voltageLi[i].value != ''){
                voltageL.push(Number(voltageLi[i].value));
            }
        
        
        }
    let ATree=[];
    let ALink=[];
    let IB=[];
    let EB=[];
    let ZB=[];
    let numNodes=math.max(...nodes);
    for(let i = 0;i < node1.length;i++){

        const branch = new Array(numNodes).fill(0);
        const res =new Array(node1.length+node1L.length).fill(0);
        branch[node1[i]-1] = 1;
        branch[node2[i]-1] =-1;
        res[i]=resBr[i];
        ATree.push(branch);
        IB.push([currentB[i]]);
        EB.push([voltageB[i]]);
        ZB.push(res);

    }
    for(let i = 0;i < node1L.length;i++){

        const link = new Array(numNodes).fill(0);
        const resLink =new Array(node1.length+node1L.length).fill(0);

        link[node1L[i]-1] = 1;
        link[node2L[i]-1] =-1;
        resLink[i+node1.length]=resLi[i];
        ALink.push(link);
        IB.push([currentL[i]]);
        EB.push([voltageL[i]]);
        ZB.push(resLink)

    }

    ATree=transpose(ATree);
    ALink=transpose(ALink);

    console.log(ATree);
    console.log(ALink);
    console.log(EB,IB);
    console.log(ZB);
    ATree.pop();
    ALink.pop();


const A =[];

// Concat of Matrix A
for(let i = 0;i < ALink.length;i++){
A[i]= ATree[i].concat(ALink[i]);
}
console.log(A);
// C , Clink Matrix
const C= math.multiply(math.inv(ATree),A);
const CLink=math.multiply(math.inv(ATree),ALink);

//  Btree Matrix
const BTree= transpose(CLink);

for(let i = 0;i < BTree.length;i++){
    for(let j = 0;j< BTree[i].length;j++){
        BTree[i][j]= math.multiply(BTree[i][j],-1);
    }
}
// B Matrix
const B=[];
const IMatrix=constructIdentity(BTree.length);

for(let i = 0;i < BTree.length;i++){

    B[i]=BTree[i].concat(IMatrix[i]);
}

console.log(B,C);
    //equation : B * Zb * Btrans * IL = B * Eb - B * Zb * Ib

    let Btrans=transpose(B);
    let leftEquation = math.multiply(B , math.multiply(ZB,Btrans));

    let rightEquation = math.subtract( math.multiply(B,EB) , math.multiply(B , math.multiply(ZB,IB)));
    let IL=math.multiply(math.inv(leftEquation) ,rightEquation);
    

    let JB=math.multiply(math.transpose(B) , IL);
    let VB=math.subtract(math.multiply(ZB , math.add(JB,IB)) , EB);
for(let i = 0;i < JB.length;i++){
    JB[i]=Number.parseFloat(JB[i]).toFixed(2);
    VB[i]=Number.parseFloat(VB[i]).toFixed(2);
}

if(console.error){
    document.querySelector('.solution').innerHTML=console.error.call;
}
document.querySelector('.solution').style.background= "rgb(210, 220, 234)";
document.querySelector('#cy').style.background= "rgb(210, 220, 234)";
document.querySelector('.solution').innerHTML=`Solutions:<p style=' font-size: 23px;
font-weight: 500;color:red'><br/><br/>VB =[${VB}] <br/><br/>JB =[${JB}] </p>`;


//draw graph

var cy = cytoscape({
    container: document.getElementById('cy'),
    
    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
    .selector('node')
        .css({
          'content': 'data(name)',
          'text-valign': 'center',
          'color': 'white',
          'text-outline-width': 1,
          'text-outline-color': '#888',
          'background-color': '#333'
        })
      .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'
        }), 
    elements: {
      nodes: CreateNodes(numNodes),
      
      edges: CreateEdge([...node1.concat(node1L)],[...node2.concat(node2L)])
    },
  
    layout: {
      name: 'grid',
      padding: 10
    }
  });
  
//   cy.on('tap', 'node', function(){
//     try { // your browser may block popups
//       window.open( this.data('href') );
//     } catch(e){ // fall back on url change
//       window.location.href = this.data('href');
//     }
//   });

    
    }
function CreateNodes(num){
    let nodes=[];
    for(let i= 0 ; i<num ;i++){
        nodes[i]={data: { id: `${i+1}`, name: `${i+1}` }}
    }
    return nodes
}
function CreateEdge(node1,node2){
    let edges =[]
    for(let i= 0 ; i<node1.length ;i++){
        edges[i]={ data: { source: `${node1[i]}`, target: `${node2[i]}` } }
    }
    return edges
}

// Transpose Function
function transpose(matrix) {
    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

// Identify Matrix Function
function constructIdentity(num){
    const res = [];
    for(let i = 0; i < num; i++){
        if(!res[i]){
            res[i] = [];
        };
        for(let j = 0; j < num; j++){
            if(i === j){
                res[i][j] = 1;
        }else{
                res[i][j] = 0;
            };
        };
    };
    return res;
}
