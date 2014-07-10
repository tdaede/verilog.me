module d_latch (e, d, q, q_not);
   // Since we didn't specify widths, each of these registers is 1 bit wide
   input wire e, d;              // e and d are input wires (nets)
   output reg q, q_not;          // q and q_not are output registers

   always @(posedge e) begin     // On each positive edge of the input e,
      q = d;                     //    set q to the value of d
      q_not = ~d;                //    and d to the bitwise negation of d
   end
endmodule