<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'start_time',
        'end_time',
    ];

    public function players()
    {
        return $this->belongsToMany(Player::class)->withPivot(['player_id','session_id','score']);
    }

    public function player()
    {
        return $this->belongsTo(Player::class)->withPivot(['player_id','session_id','score']);
    }


}
