<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->bigIncrements('score_id');
            $table->unsignedBigInteger('player_id');
            $table->unsignedBigInteger('session_id');
            $table->integer('round_number');
            $table->integer('set_number')->default(1);
            $table->integer('leg_number')->default(3);
            $table->integer('throw_number')->default(1);
            $table->integer('throw_score');
            $table->json('round_score')->nullable();
            $table->boolean('is_busted')->default(false);
            
            // Define foreign key for player_id
            $table->foreign('player_id')->references('player_id')->on('players');
      
            // Define foreign key for session_id
            $table->foreign('session_id')->references('session_id')->on('sessions');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('scores');
    }
 };
