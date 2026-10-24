/* EXAM VENUES
   Right now this is still SAMPLE DATA. When the real venues are confirmed, set EXAM_SAMPLE to false
   (that hides the yellow "sample" warning).

   Each row is one rule. Use ONE of these two ways to say who it applies to:
   1) serial:[from,to]  = the last 3 digits of the matric number (the student's serial number).
      Example: serial:[1,30] covers F/ND/23/3210001 up to F/ND/23/3210030.
      Optional prefix:"F/ND/23/" limits the rule to one set of students (leave it out to cover everyone).
   2) from:3210001, to:3210060, prefix:"F/ND/23/"  = a full range of matric numbers.

   venue is required. course, date (YYYY-MM-DD), time and note are optional: add them when you have them. */
window.EXAM_SAMPLE=true;
window.EXAMS=[
  {serial:[1,30],venue:"New Building"},
  {serial:[31,60],venue:"New Science Building"},
  {serial:[61,90],venue:"Multi-purpose Hall"},
  {serial:[91,120],venue:"Science Complex"}
];
