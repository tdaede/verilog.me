module simple_tb;

   reg [3:0] A = 4'b1010;

   wire [3:0] B;

   initial
     begin
        $dumpfile("waveform.vcd");
        $dumpvars(0, s);
        $monitor("A is %b, B is %b.", A, B);
        #50 A = 4'b1100;
        #50 $finish;
     end

   simple s(A, B);

endmodule