import * as fs from "fs";

function splitFile(filename: string, partName: string) {
  const content = fs.readFileSync(filename, "utf-8");
  const lines = content.split("\n");
  
  // Find TBS blocks
  const tbsStartIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## tbs-")) {
      tbsStartIndices.push(i);
    }
  }
  
  const totalTBS = tbsStartIndices.length;
  const midpoint = Math.ceil(totalTBS / 2);
  
  // Find header end (before first TBS)
  const headerEnd = tbsStartIndices[0];
  const header = lines.slice(0, headerEnd).join("\n");
  
  // Split A: first half
  const splitAEnd = tbsStartIndices[midpoint];
  const partAContent = lines.slice(headerEnd, splitAEnd).join("\n");
  
  // Split B: second half
  const partBContent = lines.slice(splitAEnd).join("\n");
  
  // Write Part A
  const filenameA = filename.replace(".md", "a.md");
  const headerA = `# TBS Sample for Review - Batch 1, Part ${partName}a
TBS in this part: ${midpoint} (first half of Part ${partName})

---

# TBS Questions

`;
  fs.writeFileSync(filenameA, headerA + partAContent);
  console.log(`  ${partName}a: ${midpoint} TBS, ${(fs.statSync(filenameA).size / 1024).toFixed(1)} KB`);
  
  // Write Part B
  const filenameB = filename.replace(".md", "b.md");
  const headerB = `# TBS Sample for Review - Batch 1, Part ${partName}b
TBS in this part: ${totalTBS - midpoint} (second half of Part ${partName})

---

# TBS Questions

`;
  fs.writeFileSync(filenameB, headerB + partBContent);
  console.log(`  ${partName}b: ${totalTBS - midpoint} TBS, ${(fs.statSync(filenameB).size / 1024).toFixed(1)} KB`);
}

console.log("Splitting large Batch 1 parts...\n");

splitFile("./TBS_SAMPLE_BATCH1_PART1.md", "1");
splitFile("./TBS_SAMPLE_BATCH1_PART3.md", "3");
splitFile("./TBS_SAMPLE_BATCH1_PART4.md", "4");

console.log("\nDone!");
