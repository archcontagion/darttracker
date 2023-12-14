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
            $table->unsignedBigInteger('SessionPlayerID');
            $table->integer('RoundNumber');
            $table->integer('SetNumber');
            $table->integer('LegNumber');
            $table->integer('ThrowNumber');
            $table->integer('ThrowScore');
            
            // Define foreign key for SessionPlayerID
            $table->foreign('SessionPlayerID')->references('SessionPlayerID')->on('session_players');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('scores');
    }
 };
