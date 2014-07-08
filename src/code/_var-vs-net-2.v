module triple_and (clock, in1, in2, in3, out);
   input wire in1, in2, in3;
   output reg out;

   assign out = in1 & in2 & in3;
endmodule
