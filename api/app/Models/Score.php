<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'RoundNumber',
        'SetNumber',
        'LegNumber', 
        'ThrowNumber',
        'ThrowScore',
        'SessionID',
        'PlayerID',       
    ];

}
