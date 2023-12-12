<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('session_players', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('sets')->default(1);
            $table->integer('legs')->default(3);
            $table->integer('throw_number');
            $table->integer('throw_score')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_players');
    }
};
