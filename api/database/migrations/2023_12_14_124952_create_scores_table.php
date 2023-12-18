<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->bigIncrements('ScoreID');
            $table->unsignedBigInteger('PlayerID');
            $table->unsignedBigInteger('SessionID');
            $table->integer('RoundNumber');
            $table->integer('SetNumber');
            $table->integer('LegNumber');
            $table->integer('ThrowNumber');
            $table->integer('ThrowScore');
            
            // Define foreign key for PlayerID
            $table->foreign('PlayerID')->references('PlayerID')->on('players');
      
            // Define foreign key for SessionID
            $table->foreign('SessionID')->references('SessionID')->on('sessions');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('scores');
    }
 };
