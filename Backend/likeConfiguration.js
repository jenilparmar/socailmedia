let level4 = {
  1: "https://iili.io/Jsl2fSe.jpg",
  2: "https://iili.io/Jsl2zoQ.md.jpg",
  3: "https://iili.io/Jsl2nNj.md.jpg",
  4: "https://iili.io/Jsl2BHu.md.jpg",
  5: "https://iili.io/Jsl2oDx.md.webp",
  6: "https://iili.io/Jsl2IVV.md.jpg",
  7: "https://iili.io/Jsl2TiB.md.jpg",
  8: "https://iili.io/Jsl2AKP.md.jpg",
  9: "https://iili.io/Jsl2Rl1.md.jpg",
  10: "https://iili.io/Jsl25UF.md.jpg",
  11: "https://iili.io/Jsl2YHg.md.jpg",
  12: "https://iili.io/Jsl2cOJ.md.jpg",
  13: "https://iili.io/Jsl2aRa.jpg",
  14: "https://iili.io/Jsl2lDv.md.jpg",
  15: "https://iili.io/Jsl21xR.md.jpg",
  16: "https://iili.io/Jsl2EVp.md.jpg",
  17: "https://iili.io/Jsl28s2.md.png",
  18: "https://iili.io/Jsl2GiN.md.jpg"
};

let level3 = {
  1: "https://iili.io/Jsl2VfI.md.jpg",
  2: "https://iili.io/Jsl2XUX.md.jpg",
  3: "https://iili.io/Jsl2Wlt.jpg",
  4: "https://iili.io/Jsl2jJn.webp",
  5: "https://iili.io/Jsl2NOG.md.jpg",
  6: "https://iili.io/Jsl2Obf.md.jpg",
  7: "https://iili.io/Jsl2wRs.jpg",
  8: "https://iili.io/Jsl2vWl.webp",
  9: "https://iili.io/Jsl2g07.png",
  10: "https://iili.io/Jsl2ZWQ.png",
  11: "https://iili.io/Jsl2UfS.png",
  12: "https://iili.io/Jsl2rg9.png",
  13: "https://iili.io/Jsl2P5u.png",
  14:"https://iili.io/Jsl26Je.png",
  15:"https://iili.io/Jsl2pg1.png",
  16:"https://iili.io/Jsl2sbj.png" ,
  17:"https://iili.io/Jsl2Qzx.png",
  18:"https://iili.io/Jsl2bqB.png"

};
 
  let level2 = {
 1:   "https://iili.io/Jsl39dF.png",
  2:  "https://iili.io/Jsl2tsV.png",
   3: "https://iili.io/Jsl2m0P.md.jpg",
   4: "https://iili.io/Jsl3Jea.png",
    5:"https://iili.io/Jsl3H5g.md.jpg",
    6:"https://iili.io/Jsl3dmJ.md.jpg" ,
    7:"https://iili.io/Jsl33zv.md.jpg" ,
    8:"https://iili.io/Jsl3Ksp.md.jpg",
    9:"https://iili.io/Jsl3qqN.md.jpg",
    10:"https://iili.io/Jsl3B1I.md.jpg",
    11:"https://iili.io/Jsl3Cgt.md.jpg" ,
    12:"https://iili.io/Jsl3odX.jpg",
    13:"https://iili.io/Jsl3x7n.md.jpg" ,
    14:"https://iili.io/Jsl3ImG.md.jpg",
    15:"https://iili.io/Jsl3uIf.png",
    16:"https://iili.io/Jsl3AX4.png",
    17:"https://iili.io/Jsl3l29.md.png",
    18:"https://iili.io/Jsl3RLl.png"
  };
  let level1 = {
   1: "https://iili.io/Jsl37B2.md.png" ,
2:"https://iili.io/Jsl31ku.md.png" ,
3:"https://iili.io/Jsl3Y1S.md.png" ,
4:"https://iili.io/Jsl3ar7.md.png" ,
5:"https://iili.io/Jsl307e.png",
6:"https://iili.io/Jsl3Vhx.md.png",
7:"https://iili.io/Jsl3MIj.md.png",
8:"https://iili.io/Jsl3WLQ.md.png",
9:"https://iili.io/Jsl3Emb.md.jpg" ,
10:"https://iili.io/Jsl3hBV.png",
11:"https://iili.io/Jsl3wrP.md.jpg" ,
12:"https://iili.io/Jsl3jEB.md.jpg",
13:"https://iili.io/Jsl3O21.md.jpg",
14:"https://iili.io/Jsl3eYF.md.jpg" ,
15:"https://iili.io/Jsl3kkg.md.jpg"

  };
 




  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getImageL1() {
    return level1[getRandomInt(1, Object.keys(level1).length)];
  }
  
  function getImageL2() {
    return level2[getRandomInt(1, Object.keys(level2).length)];
  }
  
  function getImageL3() {
    return level3[getRandomInt(1, Object.keys(level3).length)];
  }
  
  function getImageL4() {
    return level4[getRandomInt(1, Object.keys(level4).length)];
  }
  
// Export the functions
module.exports = {
    getImageL1,
    getImageL2,
    getImageL3,
    getImageL4
  };