<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('session_players', function (Blueprint $table) {
            $table->bigIncrements('SessionPlayerID');
            $table->unsignedBigInteger('SessionID');
            $table->unsignedBigInteger('PlayerID');
            $table->string('OtherSessionPlayerAttributes');

            // Define foreign key for SessionID
            $table->foreign('SessionID')->references('SessionID')->on('sessions');

            // Define foreign key for PlayerID
            $table->foreign('PlayerID')->references('PlayerID')->on('players');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('session_players');
    }
};
