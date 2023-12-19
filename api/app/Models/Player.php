<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'player_name',
        'player_title',
        'player_image'        
    ];

    public function sessions()
    {
        return $this->belongsToMany(Session::class)->withPivot(['player_id', 'session_id','score']);;
    }

    public function session(){
        return $this->belongsTo(Session::class)->withPivot(['player_id','session_id','score']);
    }
}
